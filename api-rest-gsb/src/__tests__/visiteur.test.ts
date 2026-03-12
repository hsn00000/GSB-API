

import { VisiteurModel as Visiteur } from '../models/Visiteur';
import { VisiteurService } from '../services/Visiteur';

const visiteurService = new VisiteurService();
const createVisiteur = visiteurService.createVisiteur.bind(visiteurService);

describe('Tests de création d\'un Visiteur', () => {
  const mockEmail = 'test@example.com';
  const mockVisiteurData = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: mockEmail,
    telephone: '0600000000'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cas nominal (succès)
  it('devrait créer un visiteur avec succès si l\'email est libre', async () => {
    // Conditions : findOne retourne null et save réussit [cite: 10, 11, 12]
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(null);
    const mockSave = jest.fn().mockResolvedValue(mockVisiteurData);
    jest.spyOn(Visiteur.prototype, 'save').mockImplementation(mockSave);

    const resultat = await createVisiteur(mockVisiteurData);

    // Résultat attendu [cite: 13, 14, 15, 16]
    expect(resultat).toBeDefined();
    expect(Visiteur.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(mockSave).toHaveBeenCalled();
  });

  // Cas d'erreur 1 : Email existe déjà [cite: 17, 18]
  it('devrait lancer une erreur si l\'email existe déjà', async () => {
    // Conditions : findOne retourne un visiteur existant [cite: 19, 20]
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(mockVisiteurData);
    const mockSave = jest.spyOn(Visiteur.prototype, 'save');

    // Résultat attendu : Erreur lancée, save() non appelé, findOne() appelé [cite: 21, 22, 23, 24]
    await expect(createVisiteur(mockVisiteurData)).rejects.toThrow(`Un visiteur avec l'email ${mockEmail} existe déjà`);
    expect(Visiteur.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(mockSave).not.toHaveBeenCalled();
  });

  // Cas d'erreur 2 : Erreur de validation Mongoose [cite: 25, 26]
  it('devrait lancer une erreur de validation si les données sont invalides', async () => {
    // Conditions : findOne retourne null, save rejette une ValidationError [cite: 27, 28, 29]
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(null);
    
    const validationError = {
      name: 'ValidationError',
      errors: {
        email: { message: 'Email mal formaté' }
      }
    } as any;
    const mockSave = jest.fn().mockRejectedValue(validationError);
    jest.spyOn(Visiteur.prototype, 'save').mockImplementation(mockSave);

    // Résultat attendu : Erreur formatée [cite: 30, 31, 32]
    await expect(createVisiteur(mockVisiteurData)).rejects.toThrow('Validation échouée: Email mal formaté');
  });
});
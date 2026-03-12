import { VisiteurModel as Visiteur } from '../models/Visiteur';
import { VisiteurService } from '../services/Visiteur';

const visiteurService = new VisiteurService();
const createVisiteur = visiteurService.createVisiteur.bind(visiteurService);

describe('Tests de creation d un Visiteur', () => {
  const mockEmail = 'test@example.com';
  const mockVisiteurData = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: mockEmail,
    telephone: '0600000000',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait creer un visiteur avec succes si l email est libre', async () => {
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(null);
    const mockSave = jest.fn().mockResolvedValue(mockVisiteurData);
    jest.spyOn(Visiteur.prototype, 'save').mockImplementation(mockSave as any);

    const resultat = await createVisiteur(mockVisiteurData as any);

    expect(resultat).toBeDefined();
    expect(Visiteur.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(mockSave).toHaveBeenCalled();
  });

  it('devrait lancer une erreur si l email existe deja', async () => {
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(mockVisiteurData as any);
    const mockSave = jest.spyOn(Visiteur.prototype, 'save');

    await expect(createVisiteur(mockVisiteurData as any)).rejects.toThrow(
      `Un visiteur avec l'email ${mockEmail} existe deja`
    );

    expect(Visiteur.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(mockSave).not.toHaveBeenCalled();
  });

  it('devrait lancer une erreur de validation si les donnees sont invalides', async () => {
    jest.spyOn(Visiteur, 'findOne').mockResolvedValue(null);

    const validationError = {
      name: 'ValidationError',
      errors: {
        email: { message: 'Email mal formate' },
      },
    } as any;

    const mockSave = jest.fn().mockRejectedValue(validationError);
    jest.spyOn(Visiteur.prototype, 'save').mockImplementation(mockSave as any);

    await expect(createVisiteur(mockVisiteurData as any)).rejects.toThrow(
      'Validation echouee: Email mal formate'
    );
  });
});
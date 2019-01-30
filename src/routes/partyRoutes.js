import express from 'express';
import PartyController from '../controllers/partyController';
import Validate from '../middlewares/validator';

const router = express.Router();

router.get('/parties', PartyController.getAllParties);
router.post('/parties',  Validate.validatePartyName, Validate.validateHqAddress, Validate.validateLogoUrl, PartyController.createParty);
router.get('/parties/:id', Validate.findPartyById, PartyController.getPartyById);

export default router;
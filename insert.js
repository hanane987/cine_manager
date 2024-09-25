// insert.js
const User = require('./models/Utilisateur');
const Client = require('./models/Client');
const Administrateur = require('./models/Administrateur');
const Film = require('./models/Film');
const Salle = require('./models/Salle');
const Seance = require('./models/Seance');
const Reservation = require('./models/Reservation');

// Function to insert data
async function insert() {
    try {
        // Create Users
        const alice = await User.create({ nom: 'Alice Dupont', email: 'alice@example.com', mot_de_passe: 'password123', role: 'Client' });
        const bob = await User.create({ nom: 'Bob Martin', email: 'bob@example.com', mot_de_passe: 'password123', role: 'Client' });
        const jane = await User.create({ nom: 'Jane Admin', email: 'jane.admin@example.com', mot_de_passe: 'adminpass', role: 'Administrateur' });

        // Create Clients and Admin
        const client1 = await Client.create({ user: alice._id, historiqueReservations: '' });
        const client2 = await Client.create({ user: bob._id, historiqueReservations: '' });
        const admin = await Administrateur.create({ user: jane._id, listeAdmins: '' });

        // Create Films
        const filmA = await Film.create({ titre: 'Film A', duree: 120, genre: 'Action', description: 'Un film d\'action palpitant.', admin: admin._id });
        const filmB = await Film.create({ titre: 'Film B', duree: 90, genre: 'Comédie', description: 'Une comédie hilarante.', admin: admin._id });

        // Create Salles
        const salle1 = await Salle.create({ nomSalle: 'Salle 1', capacite: 100, typeSalle: 'IMAX', admin: admin._id });
        const salle2 = await Salle.create({ nomSalle: 'Salle 2', capacite: 50, typeSalle: 'Standard', admin: admin._id });

        // Create Seances
        const seance1 = await Seance.create({ horaire: new Date('2024-09-25 18:00:00'), film: filmA._id, salle: salle1._id, tarif: 10.00, placesDisponibles: 100, admin: admin._id });
        const seance2 = await Seance.create({ horaire: new Date('2024-09-25 20:00:00'), film: filmB._id, salle: salle2._id, tarif: 8.00, placesDisponibles: 50, admin: admin._id });

        // Create Reservations
        await Reservation.create({ client: client1._id, seance: seance1._id, nombreDePlaces: 2, status: 'Confirmée' });
        await Reservation.create({ client: client2._id, seance: seance2._id, nombreDePlaces: 1, status: 'Annulée' });

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insert();

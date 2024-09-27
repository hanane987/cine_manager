import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app'; 
import Salle from '../models/Salle.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
let request;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    request = supertest(app);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Salle API tests', () => {

    let adminId;

    beforeEach(async () => {
       
        await Salle.deleteMany({});
        adminId = new mongoose.Types.ObjectId();
    });

    test('Should create a new salle', async () => {
        const res = await request.post('/api/salles')
            .send({
                nomSalle: 'Salle 1',
                capacite: 100,
                typeSalle: '3D',
                admin: adminId
            })
            .expect(201);

        expect(res.body.nomSalle).toBe('Salle 1');
        expect(res.body.capacite).toBe(100);
        expect(res.body.typeSalle).toBe('3D');
        expect(res.body.admin).toBe(String(adminId));
    });

    test('Should retrieve all salles', async () => {
        await request.post('/api/salles')
            .send({
                nomSalle: 'Salle 1',
                capacite: 100,
                typeSalle: '3D',
                admin: adminId
            });

     
        const res = await request.get('/api/salles').expect(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].nomSalle).toBe('Salle 1');
    });

    test('Should retrieve a salle by ID', async () => {
        const newSalle = new Salle({
            nomSalle: 'Salle 1',
            capacite: 100,
            typeSalle: '3D',
            admin: adminId
        });
        await newSalle.save();

        const res = await request.get(`/api/salles/${newSalle._id}`).expect(200);
        expect(res.body.nomSalle).toBe('Salle 1');
        expect(res.body.capacite).toBe(100);
    });

    test('Should update a salle by ID', async () => {
        const newSalle = new Salle({
            nomSalle: 'Salle 1',
            capacite: 100,
            typeSalle: '3D',
            admin: adminId
        });
        await newSalle.save();

        const res = await request.put(`/api/salles/${newSalle._id}`)
            .send({
                nomSalle: 'Updated Salle',
                capacite: 120
            })
            .expect(200);

        expect(res.body.nomSalle).toBe('Updated Salle');
        expect(res.body.capacite).toBe(120);
    });

    test('Should delete a salle by ID', async () => {
        const newSalle = new Salle({
            nomSalle: 'Salle 1',
            capacite: 100,
            typeSalle: '3D',
            admin: adminId
        });
        await newSalle.save();

        await request.delete(`/api/salles/${newSalle._id}`).expect(204);
    });
});

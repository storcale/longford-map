/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDB from '@/helpers/db';
import Marker from '@/helpers/models/marker'


export default async function handler(req, res) {
    try {
        const db = await connectDB();
        res.status(200).json({ message: 'Database connected!', db: db.version });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  
    if (req.method === 'GET') {
      try {
        const markers = await Marker.find({});
        res.status(200).json(markers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch markers' });
      }
    } else if (req.method === 'POST') {
      try {
        const { position, description } = req.body;
        const newMarker = new Marker({ position, description });
        await newMarker.save();
        res.status(201).json(newMarker);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create marker' });
      }
    }
  }


/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDB from '@/helpers/db';
import Marker from '@/helpers/models/marker'
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Cache-Control", "no-store"); 
    try {
        const db = await connectDB();
        console.log('Connected to database version: '+db.version)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }

    if (req.method === 'GET') {
      try {
        const markers = await Marker.find({});
        console.log('Markers from database:', markers);
        res.status(200).json(markers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch markers' });
      }
    } else if (req.method === 'POST') {
      try {
        const { position, name, description } = req.body;
        console.log('Received POST body:', req.body);
        const newMarker = new Marker({ position, name,description });
        await newMarker.save();
        res.status(201).json(newMarker);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create marker' });
      }
    }
  }


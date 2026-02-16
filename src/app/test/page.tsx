'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';

export default function TestPage() {
  const [status, setStatus] = useState('Checking...');
  const [collections, setCollections] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test basic connection
        const health = await pb.health.check();
        setStatus(`✅ Connected to PocketBase at ${pb.baseUrl}`);
        
        // Get all collections
        const collectionsList = await pb.collections.getFullList();
        setCollections(collectionsList);
        
        // Try different collection names
        const possibleNames = ['videos', 'anime', 'media', 'files'];
        for (const name of possibleNames) {
          try {
            const records = await pb.collection(name).getList(1, 10);
            setVideos(records.items);
            setStatus(prev => prev + ` | Found data in '${name}' collection`);
            break;
          } catch (err) {
            console.log(`Collection '${name}' not found or empty`);
          }
        }
        
      } catch (error) {
        console.error('Connection error:', error);
        setStatus(`❌ Failed to connect to PocketBase at ${pb.baseUrl}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">PocketBase Connection Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Connection Status:</h2>
        <p className="text-lg">{status}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Collections:</h2>
        {collections.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            {collections.map((col) => (
              <li key={col.id} className="text-gray-300">
                {col.name} (ID: {col.id})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mb-4">No collections found</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Records Found: {videos.length}</h2>
        {videos.length > 0 ? (
          <div className="grid gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-400">ID: {video.id}</p>
                {video.video && (
                  <div className="mt-2">
                    <p className="text-sm">Video file: {video.video}</p>
                    <video 
                      controls 
                      className="mt-2 max-w-md"
                      src={pb.files.getUrl(video, video.video)}
                    >
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos found or connection failed</p>
        )}
      </div>

      <div className="text-sm text-gray-400">
        <p>PocketBase URL: {pb.baseUrl}</p>
        <p>Make sure PocketBase is running and accessible</p>
      </div>
    </div>
  );
}
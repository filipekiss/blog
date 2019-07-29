import React from 'react';
import PageLayout from '../components/PageLayout';
import Meta from '../components/Meta';

export default () => (
    <PageLayout className="min-h-full">
        <Meta title="404 — Not found">
            <link
                href="https://fonts.googleapis.com/css?family=Bungee+Outline&amp;display=swap"
                rel="stylesheet"
            />
            <style type="text/css">
                {`
              .font-display {
                font-family: 'Bungee Outline';
              }
              `}
            </style>
        </Meta>
        <div className="text-center font-display text-6xl">
            <span className="bg-victoria-500 text-gray-100 p-4">4</span>
            <span className="p-4 text-victoria-500">0</span>
            <span className="bg-victoria-500 text-gray-100 p-4">4</span>
        </div>
        <div className="text-center m-8">Nothing here. :(</div>
    </PageLayout>
);

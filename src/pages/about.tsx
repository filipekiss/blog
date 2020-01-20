import React from 'react';
import Meta from '../components/Meta';
import PageLayout from '../components/PageLayout';

export default () => (
    <PageLayout>
        <Meta title="about" url="/about" />
        <h1>About</h1>
        <div className="flex flex-col items-center mb-20 lg:flex-row">
            <div className="max-w-xs mb-10 lg:mb-0 lg:max-w-full lg:order-2 lg:w-1/4">
                <img
                    className="shadow-lg rounded-circle"
                    src="/images/me.png"
                    alt="Me and my cat Tabule"
                />
            </div>
            <div className="lg:w-3/4 dropcap">
                <p className="text-xl">
                    Hi, my name is Filipe Kiss (but almost everyone calls me
                    Kiss) and I am a full stack developer based on Amsterdam,
                    the Netherlands. I have been programming for almost 20
                    years, 11 of them professionally, and I am always looking
                    for a new thing to learn about, be it software related or
                    not. You can find me on{' '}
                    <a href="https://twitter.com/filipekiss">Twitter</a> where I
                    mostly speak portuguese, but feel free to @ me.
                </p>
            </div>
        </div>
        <h5>About the blog</h5>
        <ul>
            <li>
                Site built with <a href="https://gatsbyjs.org">GatsbyJS</a>
            </li>
            <li>
                Theme is custom made, based on{' '}
                <a href="https://kothemes.com/themes/kompact/">Kompact</a>
            </li>
            <li>
                Fonts:{' '}
                <a
                    rel="noopener noreferer"
                    href="https://fonts.google.com/specimen/Nunito"
                >
                    Nunito
                </a>{' '}
                and{' '}
                <a
                    rel="noopener noreferer"
                    className="font-mono"
                    href="https://rubjo.github.io/victor-mono/"
                >
                    Victor Mono
                </a>
            </li>
            <li>
                Icons are from{' '}
                <a href="https://simpleicons.org/">SimpleIcons</a> and{' '}
                <a href="https://zondicons.com">Zondicons</a>
            </li>
            <li>TypeScript, just because</li>
            <li>
                Source available on{' '}
                <a href="https://github.com/filipekiss/blog">GitHub</a>
            </li>
        </ul>
    </PageLayout>
);

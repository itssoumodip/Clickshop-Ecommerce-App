import React from 'react';

function About() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About ClickShop</h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Your trusted destination for online shopping
                    </p>
                </div>

                <div className="mt-20">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    {/* Quality Icon */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Quality Products</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                We ensure that all products on our platform meet high-quality standards. Each item is carefully selected and verified.
                            </dd>
                        </div>

                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    {/* Security Icon */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Shopping</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                Your security is our priority. We use industry-standard encryption to protect your personal and payment information.
                            </dd>
                        </div>

                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    {/* Support Icon */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                Our customer support team is always ready to help you with any questions or concerns you may have.
                            </dd>
                        </div>

                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    {/* Delivery Icon */}
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                                We work with the best delivery partners to ensure your products reach you as quickly as possible.
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Have questions? We're here to help!<br />
                        Email: support@clickshop.com<br />
                        Phone: +1 (555) 123-4567
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
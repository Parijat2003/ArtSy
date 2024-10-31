import React from 'react'
import Layout from '../../components/Layout/Layout'
import HeroSection from '../../components/herosection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/HomePageProductCard/HomePageProductCard'
import Testimonial from '../../components/testimonials/Testimonial'

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Testimonial />
    </Layout>
  )
}
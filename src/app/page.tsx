'use client'

import HeroBanner from '@components/modules/landing/hero-banner/HeroBanner'
import FeaturedEquipment from '@components/modules/landing/featured-equipment/FeaturedEquipment'
import BrandsSlider from '@components/modules/landing/brands-slider/BrandsSlider'
import CategoriesShowcase from '@components/modules/landing/categories-showcase/CategoriesShowcase'
import DemoBanner from '@components/modules/landing/demo-banner/DemoBanner'
import InnovationsBanner from '@components/modules/landing/innovations-banner/InnovationsBanner'
import BestsellersSlider from '@components/modules/landing/bestsellers-slider/BestsellersSlider'
import AdvantagesSection from '@components/modules/landing/advantages/AdvantagesSection'
import ReviewsSection from '@components/modules/landing/reviews/ReviewsSection'
import KnowledgeBaseSection from '@components/modules/landing/knowledge-base/KnowledgeBaseSection'

export default function Home() {
	return (
		<div className='landing-page'>
			<HeroBanner />
			<FeaturedEquipment />
			<BrandsSlider />
			<CategoriesShowcase />
			<DemoBanner />
			<InnovationsBanner />
			<BestsellersSlider />
			<AdvantagesSection />
			<ReviewsSection />
			<KnowledgeBaseSection />
		</div>
	)
}

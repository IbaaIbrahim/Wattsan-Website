// Series page content model. The dashboard (views/dynamic-content-list/types.js
// and views/page-builder) holds the field definitions; this file mirrors the
// section keys the website needs to load and render a series page.
//
// A series page is built from Content rows with referenceType `series_page` and
// referenceId = series id. The row's `section` is one of:
//   - a page setting (one per series, feeds the top of the product page)
//   - a block template (can be added many times, ordered by displayOrder)
//   - a system block (generated from product data, can only be moved or hidden)
// Templates with `multiple: true` keep their items as child Content rows with
// referenceType `series_page_block` and referenceId = the block's id.

export const SERIES_PAGE_REFERENCE_TYPE = 'series_page'
export const BLOCK_ITEM_REFERENCE_TYPE = 'series_page_block'

export const SERIES_PAGE_SETTINGS = ['info_cards', 'product_info_extra', 'materials_processing'] as const
export type SeriesPageSetting = (typeof SERIES_PAGE_SETTINGS)[number]

// Old section names still found in stored data
export const LEGACY_SETTING_ALIASES: Record<string, SeriesPageSetting> = {
  delivery_pricing_notes: 'product_info_extra'
}

export interface BlockTemplateDefinition {
  name: string
  multiple: boolean
}

// Named after their layout, as shown in the dashboard's block picker
export const BLOCK_TEMPLATES: Record<string, BlockTemplateDefinition> = {
  facts_cards: { name: 'Card Carousel', multiple: true },
  power_of_machine: { name: 'Image with Feature Rows', multiple: false },
  heart_of_machinery: { name: 'Tabbed Panels', multiple: true },
  reviews: { name: 'Testimonial Slider', multiple: true },
  made_with_wattsan: { name: 'Gallery with Contact Form', multiple: true },
  production_process: { name: 'Numbered Steps', multiple: true },
  service_and_support: { name: 'Image with Card Slider', multiple: false },
  package_list: { name: 'Image Tiles', multiple: true },
  additional_content: { name: 'Resource Links', multiple: true },
  faq: { name: 'Accordion', multiple: true },
  machine_advisor: { name: 'Video with Contact Form', multiple: false },
  product_blog: { name: 'Article Cards', multiple: true },
  safety_cabin: { name: 'Feature Rows with Side Image', multiple: false },
  rotary_device: { name: 'Spec Rows with Side Image', multiple: false },
  separate_rotary_device: { name: 'Bullet List with Side Image', multiple: false },
  multi_spindles: { name: 'Banner with Spec Columns', multiple: false },
  automatic_tool_switch: { name: 'Image Intro with Video Cards', multiple: false },
  liquid_cooling: { name: 'Intro with Video Columns', multiple: false },
  aspiration_system: { name: 'Text with Video', multiple: false },
  table_types: { name: 'Media Columns', multiple: true }
}

// In default page order: a series that never placed a system block gets it appended in this order
export const SYSTEM_BLOCKS = [
  'system_materials',
  'system_specifications',
  'system_series_comparison',
  'system_reviews_questions',
  'system_related_products'
] as const
export type SystemBlock = (typeof SYSTEM_BLOCKS)[number]

export const isSystemBlock = (section: string): section is SystemBlock =>
  (SYSTEM_BLOCKS as readonly string[]).includes(section)

export const isMultiItemTemplate = (section: string): boolean => Boolean(BLOCK_TEMPLATES[section]?.multiple)

// Home page sections, still edited section by section
export const HOME_REFERENCE_TYPE = 'home'
export const HOME_SECTIONS = ['hero_slider'] as const

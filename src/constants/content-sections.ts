export interface MetaKeyDefinition {
  name: string
  type: string
  notTranslatable?: boolean
  columns?: { key: string; label: string }[]
  schema?: Record<string, MetaKeyDefinition>
  allowed_types?: string[]
  col?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  className?: string
}

export interface SectionDefinition {
  name: string
  value: string
  maxContentItems?: number
  keys: Record<string, MetaKeyDefinition>
}

export interface ReferenceTypeDefinition {
  name: string
  value: string
  sections: Record<string, SectionDefinition>
}

export const SeriesPageType: ReferenceTypeDefinition = {
  name: 'Series Page',
  value: 'series_page',
  sections: {
    info_cards: {
      name: 'Info Cards & Highlights',
      value: 'info_cards',
      maxContentItems: 1,
      keys: {
        ideal_for: { name: 'Ideal for', type: 'text' },
        economy: { name: 'Economy', type: 'text' },
        materials: {
          name: 'Materials',
          type: 'table',
          columns: [
            { key: 'name', label: 'Material Name' },
            { key: 'color', label: 'Color Hex (#RRGGBB)' }
          ]
        },
        expert_reviews: { name: 'Expert reviews count', type: 'number' }
      }
    },
    facts_cards: {
      name: 'Wattsan Facts Slider Cards',
      value: 'facts_cards',
      maxContentItems: undefined,
      keys: {
        subtitle: { name: 'Subtitle', type: 'text' },
        title: { name: 'Title', type: 'text' },
        type: { name: 'Type (image / solid)', type: 'text' },
        image: { name: 'Image', type: 'image', notTranslatable: true },
        bg_color: { name: 'Background color hex', type: 'text', notTranslatable: true },
        certifications: { name: 'Certifications', type: 'text' }
      }
    },
    power_of_machine: {
      name: 'Power of Machine (Description)',
      value: 'power_of_machine',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        subtitle: { name: 'Subtitle / Highlight', type: 'text' },
        image: { name: 'Section image', type: 'image', notTranslatable: true },
        features: {
          name: 'Machine Features',
          type: 'table',
          columns: [
            { key: 'title', label: 'Feature Title' },
            { key: 'description', label: 'Description' }
          ]
        }
      }
    },
    heart_of_machinery: {
      name: 'Heart of the Machinery',
      value: 'heart_of_machinery',
      maxContentItems: 1,
      keys: {
        spindle_title: { name: 'Spindle Title', type: 'text' },
        spindle_description: { name: 'Spindle Description', type: 'richtext' },
        spindle_image: { name: 'Spindle Diagram', type: 'image', notTranslatable: true },
        worktable_title: { name: 'Worktable Title', type: 'text' },
        worktable_description: { name: 'Worktable Description', type: 'richtext' },
        worktable_image: { name: 'Worktable Diagram', type: 'image', notTranslatable: true },
        control_system_title: { name: 'Control System Title', type: 'text' },
        control_system_description: { name: 'Control System Description', type: 'richtext' },
        control_system_image: { name: 'Control System Diagram', type: 'image', notTranslatable: true }
      }
    },
    safety_cabin: {
      name: 'Safety Cabin',
      value: 'safety_cabin',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        image: { name: 'Cabin image', type: 'image', notTranslatable: true },
        features: {
          name: 'Cabin Features',
          type: 'table',
          columns: [
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' }
          ]
        }
      }
    },
    rotary_device: {
      name: 'RD Rotary Device',
      value: 'rotary_device',
      maxContentItems: 1,
      keys: {
        subtitle: { name: 'Subtitle', type: 'text' },
        title: { name: 'Title', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        image: { name: 'Image', type: 'image', notTranslatable: true },
        specs: {
          name: 'Specifications',
          type: 'table',
          columns: [
            { key: 'label', label: 'Spec Label' },
            { key: 'value', label: 'Spec Value' }
          ]
        }
      }
    },
    separate_rotary_device: {
      name: 'Separate Rotary Device',
      value: 'separate_rotary_device',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        image: { name: 'Image', type: 'image', notTranslatable: true },
        features_title: { name: 'Features Title', type: 'text' },
        features: {
          name: 'Features',
          type: 'table',
          columns: [{ key: 'text', label: 'Feature Text' }]
        }
      }
    },
    multi_spindles: {
      name: 'Multi Spindles',
      value: 'multi_spindles',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        subtitle: { name: 'Subtitle', type: 'text' },
        description1: { name: 'Description 1', type: 'richtext' },
        description2: { name: 'Description 2', type: 'richtext' },
        image: { name: 'Image', type: 'image', notTranslatable: true },
        specs: {
          name: 'Spindle Specs',
          type: 'table',
          columns: [
            { key: 'label', label: 'Spec Label' },
            { key: 'value', label: 'Spec Value' }
          ]
        }
      }
    },
    automatic_tool_switch: {
      name: 'Automatic Tool Switch',
      value: 'automatic_tool_switch',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        subtitle: { name: 'Subtitle', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        sub_heading: { name: 'Sub-heading', type: 'text' },
        sub_description: { name: 'Sub-description', type: 'text' },
        image: { name: 'Image', type: 'image', notTranslatable: true },
        variants: {
          name: 'Variants',
          type: 'table',
          columns: [
            { key: 'title', label: 'Variant Title' },
            { key: 'description', label: 'Description' },
            { key: 'footerLabel', label: 'Footer / Warning Label' }
          ]
        }
      }
    },
    liquid_cooling: {
      name: 'Liquid Cooling System',
      value: 'liquid_cooling',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        subtitle: { name: 'Subtitle', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        types: {
          name: 'Cooling Types',
          type: 'table',
          columns: [
            { key: 'title', label: 'Type Title' },
            { key: 'description', label: 'Description' }
          ]
        }
      }
    },
    aspiration_system: {
      name: 'Aspiration System',
      value: 'aspiration_system',
      maxContentItems: 1,
      keys: {
        title: { name: 'Title', type: 'text' },
        subtitle: { name: 'Subtitle', type: 'text' },
        description: { name: 'Description', type: 'richtext' }
      }
    },
    table_types: {
      name: 'Table Types',
      value: 'table_types',
      maxContentItems: undefined,
      keys: {
        attachment: {
          name: 'Media Attachment (Image / Video)',
          type: 'attachments',
          allowed_types: ['image', 'video'],
          notTranslatable: true,
          col: { xs: 12, md: 12 }
        },
        title: { name: 'Title', type: 'text', col: { xs: 12, md: 12 } },
        content: { name: 'Content (Rich Text)', type: 'richtext', col: { xs: 12, md: 12 } }
      }
    },
    production_process: {
      name: 'Production Process',
      value: 'production_process',
      maxContentItems: undefined,
      keys: {
        step_number: { name: 'Step number', type: 'number' },
        title: { name: 'Title', type: 'text' },
        description: { name: 'Description', type: 'richtext' },
        image: { name: 'Step image', type: 'image', notTranslatable: true }
      }
    },
    service_and_support: {
      name: 'Service and Support',
      value: 'service_and_support',
      maxContentItems: 1,
      keys: {
        image: { name: 'Image', type: 'image', notTranslatable: true },
        cards: {
          name: 'Support Cards',
          type: 'repeatable',
          schema: {
            logo: { name: 'Logo / Icon', type: 'image', notTranslatable: true },
            title: { name: 'Title', type: 'text' },
            content: { name: 'Content', type: 'richtext' }
          }
        }
      }
    },
    package_list: {
      name: 'Package List (Included Items)',
      value: 'package_list',
      maxContentItems: undefined,
      keys: {
        label: { name: 'Label', type: 'text' },
        image: { name: 'Image', type: 'image', notTranslatable: true }
      }
    },
    faq: {
      name: 'Product FAQ',
      value: 'faq',
      maxContentItems: undefined,
      keys: {
        question: { name: 'Question', type: 'text' },
        answer: { name: 'Answer', type: 'richtext' }
      }
    },
    reviews: {
      name: 'Product Reviews',
      value: 'reviews',
      maxContentItems: undefined,
      keys: {
        image: { name: 'Review Photo', type: 'image', notTranslatable: true },
        content: { name: 'Review Text', type: 'richtext' },
        reviewed_by_image: { name: 'Reviewer Avatar', type: 'image', notTranslatable: true },
        reviewed_by_name: { name: 'Reviewer Name', type: 'text' },
        reviewed_by_type: { name: 'Reviewer Role / Title', type: 'text' }
      }
    },
    product_info_extra: {
      name: 'Product Delivery & Pricing Notes',
      value: 'product_info_extra',
      maxContentItems: 1,
      keys: {
        shipment: { name: 'Shipment Time', type: 'text' },
        delivery: { name: 'Delivery Time', type: 'text' },
        delivery_methods: { name: 'Delivery Methods', type: 'text' },
        delivery_note: { name: 'Delivery Note', type: 'textarea' },
        warranty: { name: 'Warranty Details', type: 'text' }
      }
    }
  }
}

export const ProductPageType: ReferenceTypeDefinition = {
  ...SeriesPageType,
  name: 'Product Page',
  value: 'product_page'
}

export const ReferenceTypes = {
  series_page: SeriesPageType,
  product_page: ProductPageType
}

export default ReferenceTypes


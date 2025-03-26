import { AllowedLangs } from '@constants/allowedLangs'

export interface ILanguage {
	header: {
		navigation: {
			[nav: string]: string
		}
		homeLink: string
		personal_dd: {
			[dd_content: string]: string
		}
	}
	languages: { [language in AllowedLangs]: string }
	equipment: {
		[nav: string]: string
		soon_label: string
	}
	accessories: {
		parts: { [nav: string]: string }
		part_options: {
			work_area: string
			z_axis: string
			spindle_power: string
			spindle_auto_quant: string
			spindle_quant: string
			motor: string
			control_sys: string
			spindle_tool_switch: string
			spindle_auto: string
			spindle_semi_auto: string
			spindle_manual: string
			add_liq_cool_sys: string
			add_remov_inst_sens: string
			add_buil_in_inst_sens: string
			add_lubrication: string
			add_aspiration: string
			add_vacuum: string
			add_rotary_device: string
			add_cabine: string
		}
		actions_bar: {
			save: string
			reset: string
			summary: string
			total: string
			power: string
		}
		view_btns: {
			rotate: string
			real_photo: string
			video: string
		}
	}
	summary: {
		view: {
			back_nav: string
		}
		title: string
		modified_label: string
		conf_tabs: {
			your_conf: string
			compar_conf: string
			basic: string
			changes: string
		}
		buttons: {
			view_all: string
			pdf_download: string
			share_label: string
			save_conf: string
			add_basket: string
			show_diff: string
		}
	}
	machines: {
		machine: string
		title_all: string
		warking_area_all: string
		edit_btn: string
		area_sizes: string
	}
	request_modal: {
		if_machine_title: string
		if_accessory: {
			title: string
			subtitle_not_compatible: string
			subtitle_compatible: string
			description: string
		}
		description: string
		fullname: {
			label: string
			placeholder: string
		}
		phone: {
			label: string
			placeholder: string
		}
		ok_btn: string
		cansel_btn: string
	}
	request_result_modal: {
		title: string
		description: string
		confirm_btn_text: string
	}
	recommendation_modal: {
		title: string
		subtitle_not_compatible: string
		subtitle_accesory_not_compatible: string
		subtitle_accesory_compatible: string
		subtitle_compatible: string
		ok_btn: string
		confirm: string
		cansel_btn: string
		cancel_description: string
	}
	save_confirm_modal: {
		title: string
		description: string
		ok_btn: string
		cansel_btn: string
	}
	basket_modal: {
		title: string
		description: string
		modified: string
		ok_btn: string
		cansel_btn: string
		add_basket: string
		go_basket: string
	}
	summary_basket_modal: {
		title: string
		description: string
		modified: string
		ok_btn: string
		cansel_btn: string
	}
	saved_conf_modal: {
		title: string
		description: string
		ok_btn: string
		cansel_btn: string
	}
	info_login_modal_before_save: {
		title: string
		ok_btn: string
		cansel_btn: string
	}
	reset_confirm_modal: {
		title: string
		ok_btn: string
		cansel_btn: string
	}
	show_parts_card: {
		not_chosen: string
	}
	accessory_info_modal: {
		title_accessory: string
		title_option: string
	}
	spindle_info: {
		overview: {
			title: string
			description: string
		}
		power: {
			title: string
			description: string
			first_column_title: string
			second_column_title: string
			[info_values: string]: string
		}
		slider: {
			description: string
		}
		quantity: {
			title: string
			description: string
			first_column_title: string
			second_column_title: string
			[info_values: string]: string
		}
		plate_type: {
			title: string
			description: string
			first_column_title: string
			second_column_title: string
			[info_values: string]: string
		}
		structure: {
			title: string
			[info_values: string]: string
		}
		cooling: {
			title: string
			overview: string
			air: {
				title: string
				description: string
			}
			water: {
				title: string
				description: string
			}
		}
		video: {
			title: string
			info: string
		}
		imgs_label: string
		info_block: string
	}
	spindle_power_option: {
		title: string
		more_btn: string
	}
	advantages: string
	disadvantages: string
	rotate_modal_title: string
	view_videos_title: string
	view_photos_title: string
	config_name_modal: {
		title: string
		description: string
		save_btn: string
		close_btn: string
		input_label: string
		input_placeholder: string
	}
}

export type LanguageStore = {
	language: AllowedLangs
	change: (newLanguage: AllowedLangs) => void
}

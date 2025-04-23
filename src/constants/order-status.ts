import _ from 'lodash'

const ORDER_CURRENT_STATUS = [
  {statusCategory: 1, status: 1, categoryName: 'current', label: 'Requested', color: '#ff9f43', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 2, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 1},
  {statusCategory: 1, status: 2, categoryName: 'current', label: 'Waiting for 30%', color: '#ff9f43', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 1},
  {statusCategory: 1, status: 3, categoryName: 'current', label: 'Payed 30%', color: '#ff9f43', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 4, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 4, categoryName: 'current', label: 'Packaging', color: '#ff9f43', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 5, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 5, categoryName: 'current', label: 'Waiting for 70%', color: '#ff9f43', nextStatusCategoryOnConfirm: 1, nextStatusOnConfirm: 6, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2},
  {statusCategory: 1, status: 6, categoryName: 'current', label: 'Payed 70% and ready for shipping', color: '#ff9f43', nextStatusCategoryOnConfirm: 2, nextStatusOnConfirm: 1, nextStatusCategoryOnCancel: 3, nextStatusOnCancel: 2}
]
const ORDER_COMPLETED_STATUS = [{statusCategory: 2, status: 1, categoryName: 'completed', label: 'Completed', color: '#28c76f', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: 4, nextStatusOnCancel: 1}]
const ORDER_CANCELLED_STATUS = [
  {statusCategory: 3, status: 1, categoryName: 'cancel', label: 'Cancelled', color: '#ea5455', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 3, status: 2, categoryName: 'cancel', label: 'Cancelling in process', color: '#00cfe8', nextStatusCategoryOnConfirm: 3, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 3, status: 3, categoryName: 'cancel', label: 'Refund expected', color: '#00cfe8', nextStatusCategoryOnConfirm: 3, nextStatusOnConfirm: 1, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null}
]
const ORDER_RETURN_STATUS = [
  {statusCategory: 4, status: 1, categoryName: 'return', label: 'Return requested', color: '#ff9f43', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 2, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 2, categoryName: 'return', label: 'Return in process', color: '#ff9f43', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 3, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 3, categoryName: 'return', label: 'Checking the goods', color: '#ff9f43', nextStatusCategoryOnConfirm: 4, nextStatusOnConfirm: 4, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null},
  {statusCategory: 4, status: 4, categoryName: 'return', label: 'Returned', color: '#ea5455', nextStatusCategoryOnConfirm: null, nextStatusOnConfirm: null, nextStatusCategoryOnCancel: null, nextStatusOnCancel: null}
]

export const ORDER_STATUS = [
  ...ORDER_CURRENT_STATUS,
  ...ORDER_COMPLETED_STATUS,
  ...ORDER_CANCELLED_STATUS,
  ...ORDER_RETURN_STATUS
]

export const getStatus = (orderProduct) => {
	return _.find(ORDER_STATUS, x => x.statusCategory === orderProduct.statusCategory && x.status === orderProduct.status)
}

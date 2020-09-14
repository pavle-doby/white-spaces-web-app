import { ShoppingCart } from 'src/models/ShopingCart.model';
import { PackageType } from './shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';

export const MockShoppingCart: ShoppingCart = {
  id: 7,
  datetime: 'Sun, 13 Sep 2020 14:35:27 GMT',
  state: 'new',
  user_id: 17,
  line_items: [],
};

// {
//   id: 2,
//   datetime: 'Sun, 02 Aug 2020 11:58:19 GMT',
//   state: 'existing',
//   user_id: 3,
//   line_items: [
//     {
//       id: 2,
//       quantity: 1,
//       price: 449,
//       additional_data: {},
//       shopping_cart_id: 2,
//       product: {
//         id: 1,
//         name: 'S',
//         format: {},
//         data: {
//           description: 'Small spaces up to 40SQM/430SQFT',
//         },
//         additional_data: {
//           questions: {
//             kitchen: [
//               {
//                 image_required: false,
//                 id: 1,
//                 question:
//                   'Do you want to remodel your kitchen completely? Please consider your budget when answering this question. If you decide to fully renovate the kitchen costs can easily add up. If you are unsure about it, we will consult you during the process and make budget friendly decisions. Don’t worry! Your kitchen will still get a new look!',
//               },
//               {
//                 image_required: false,
//                 id: 2,
//                 question:
//                   'Are there any appliances that you would like to keep in the redesign? Please make a list with dimensions info included.',
//               },
//               {
//                 image_required: false,
//                 id: 3,
//                 question:
//                   'Do you have other preferences or requests concerning the appliances?',
//               },
//               {
//                 image_required: false,
//                 id: 4,
//                 question:
//                   'Do you have any additional requests when it comes to the kitchen furniture layout?',
//               },
//             ],
//           },
//           type: PackageType.MEDIUM,
//         },
//         quantity: 1,
//         price: 449,
//         category_id: 1,
//         attributes: {},
//       },
//     },
//   ],
// };

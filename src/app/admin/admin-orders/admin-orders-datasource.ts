import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export const ORDERS_MOCK = [
  {
    id: 1,
    datetime: 'Tue, 25 Aug 2020 20:00:00 GMT',
    state: 'new',
    user_id: 1,
    line_items: [
      {
        id: 1,
        quantity: 1,
        price: 449,
        additional_data: {
          floor_plan:
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
          images: [
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
          ],
          questions: [
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: [
                'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
              ],
              answer: 'odgovor na pitanje',
            },
          ],
        },
        shopping_cart_id: 1,
        product: {
          id: 1,
          name: 'S // SMALL',
          format: {},
          data: {
            description: 'Small spaces up to 40SQM/430SQFT',
          },
          additional_data: {
            questions: {
              general: [
                {
                  id: 1,
                  image_required: false,
                  question:
                    'We would like to know a bit more about the building. What year was it built? Can you send us the address, so we can take a look at the neighbourhood? You can also tell us your impression of the area. This is important for us to get the bigger picture!',
                },
                {
                  id: 2,
                  image_required: false,
                  question:
                    'What is the ceiling height in the apartment? Is it the same in all parts?',
                },
                {
                  id: 3,
                  image_required: false,
                  question:
                    'Measure the height of the wall from the floor to the point where the windows begin.',
                },
                {
                  id: 4,
                  image_required: false,
                  question:
                    'Please provide us with the heights of all the windows if they are not included in the floor plan drawing.',
                },
                {
                  id: 5,
                  image_required: false,
                  question:
                    'Do you want to keep the flooring or to change it completely?',
                },
                {
                  id: 6,
                  image_required: false,
                  question:
                    'What aspects of the current layout and space distribution do you like?',
                },
                {
                  id: 7,
                  image_required: false,
                  question:
                    'Do you want to keep something that already exists at all costs? Such as certain walls, positions in the current layout, or maybe you want to skip the bathroom remodelling due to your budget limit. Let us know.',
                },
                {
                  id: 8,
                  image_required: false,
                  question:
                    'What are the things you currently dislike in your apartment?',
                },
                {
                  id: 9,
                  image_required: false,
                  question:
                    'Would you opt for the open space or a more traditional layout? If you want to add any specifics, feel free to do so. For example, you might want a joint dining room and living room but a separate kitchen. It all depends on your needs and dreams.',
                },
                {
                  id: 10,
                  image_required: false,
                  question:
                    'Do we need to predict future room repurposing? For example, we can predict space for a future nursery in one of the existing rooms.',
                },
                {
                  id: 11,
                  image_required: true,
                  question:
                    'Do you need a home office? If so, will the clients visit you there?',
                },
                {
                  id: 12,
                  image_required: true,
                  question:
                    'What type of cooling/heating system do you have in the apartment? Please let us know about any specifics that we should be aware of. Such as placement of indoor fan coil units so that we can work around them in best manner possible. You can always, beside the sketches, upload the photos to help us visually.',
                },
                {
                  id: 13,
                  image_required: true,
                  question:
                    'If you have radiators in the apartment, make sure you sketch all of the positions and write the dimensions for each.',
                },
                {
                  id: 14,
                  image_required: false,
                  question:
                    'Please let us know the precise dimensions and the placement of the water heater(s).',
                },
              ],
              bathroom: [
                {
                  id: 15,
                  image_required: false,
                  question:
                    'Were you planning to remodel your bathroom? Please consider your budget when answering this question. Opting for this feature can significantly raise costs, depending on the country you are in. If you are unsure about it, we will make decisions based on the budget you have and consult you along the process. Do not stress about this!',
                },
                {
                  id: 16,
                  image_required: false,
                  question: 'Are you a bathtub or a shower person?',
                },
                {
                  id: 17,
                  image_required: false,
                  question:
                    'Do you already own bathroom furniture or sets that you would like to keep in the redesign? If yes, please make a list with dimensions info included.',
                },
                {
                  id: 18,
                  image_required: false,
                  question: 'Do you want to redo the plumbing fixtures?',
                },
                {
                  id: 19,
                  image_required: false,
                  question:
                    'Would you allow the displacements of bathroom fixtures, in case we have to? In case they are fully functional, keeping the existing fixtures can save up a lot. In that scenario, you don’t need a licensed plumber or special permits. We can do miracles if the structure is good!',
                },
                {
                  id: 20,
                  image_required: false,
                  question:
                    'What else can we help you with when it comes to the bathroom renovation?',
                },
              ],
              kitchen: [
                {
                  id: 21,
                  image_required: false,
                  question:
                    'Do you want to remodel your kitchen completely? Please consider your budget when answering this question. If you decide to fully renovate the kitchen costs can easily add up. If you are unsure about it, we will consult you during the process and make budget friendly decisions. Don’t worry! Your kitchen will still get a new look!',
                },
                {
                  id: 22,
                  image_required: false,
                  question:
                    'Are there any appliances that you would like to keep in the redesign? Please make a list with dimensions info included.',
                },
                {
                  id: 23,
                  image_required: false,
                  question:
                    'Do you have other preferences or requests concerning the appliances?',
                },
                {
                  id: 24,
                  image_required: false,
                  question:
                    'Do you have any additional requests when it comes to the kitchen furniture layout?',
                },
              ],
              storage: [
                {
                  id: 25,
                  image_required: false,
                  question:
                    'Would you say that you have enough storage space at the moment?',
                },
                {
                  id: 26,
                  image_required: false,
                  question: 'Do you want to have built-in storage space?',
                },
                {
                  id: 27,
                  image_required: false,
                  question:
                    'How do you feel about a walk-in closet, space permitting?',
                },
                {
                  id: 28,
                  image_required: false,
                  question:
                    'Do you have any special storage requirements? For example, ski equipment or baby strollers require storage space with specific dimensions.',
                },
              ],
              furniture: [
                {
                  id: 29,
                  image_required: false,
                  question:
                    'Is there any furniture that you would like to keep? If so, please make a detailed furniture list with item dimensions. You can also include links or photos so that we have visual aid.',
                },
                {
                  id: 30,
                  image_required: false,
                  question:
                    'In a living room, the sofa is a crucial item. What are your preferences? Do you want to have an L-shaped sofa, a love seat, or a three-seater piece? Tell us everything!',
                },
                {
                  id: 31,
                  image_required: true,
                  question:
                    'If there already are furniture items on your wish list, share them with us! We would love to see your ideas and incorporate them into the design. Planning is the key!',
                },
                {
                  id: 32,
                  image_required: false,
                  question:
                    'Let us know if you have more specific requirements for furniture.',
                },
              ],
              personal: [
                {
                  id: 33,
                  image_required: false,
                  question: 'How many people live in the apartment?',
                },
                {
                  id: 34,
                  image_required: false,
                  question:
                    'Can you please describe the daily routines and apartment habits of all residents?',
                },
                {
                  id: 35,
                  image_required: false,
                  question:
                    'Are there kids living in the apartment? Parents usually have special requirements because they need to plan out so many things. Please, be as specific as you can and tell us what you need.',
                },
                {
                  id: 36,
                  image_required: false,
                  question:
                    'What specific hobbies and indoor activities are important to you and your family when you spend time at home?',
                },
                {
                  id: 37,
                  image_required: false,
                  question:
                    'Do you have any special needs regarding the country or the culture you live in? All of us have different lifestyles that are sometimes based on cultural norms. Please let us know how we can optimize your place the best having the cultural criteria in mind. We would love to know about your culture!',
                },
                {
                  id: 38,
                  image_required: false,
                  question:
                    'Do you often have guests over, or like to host gatherings?',
                },
                {
                  id: 39,
                  image_required: false,
                  question:
                    'Do you or other residents need a private nook for some quiet time?',
                },
                {
                  id: 40,
                  image_required: false,
                  question:
                    'Do you have a pet? We are pet-friendly and would like to help you optimize your apartment for pets.',
                },
                {
                  id: 41,
                  image_required: false,
                  question:
                    'Is there anything else that you want to add in this section?',
                },
              ],
              budget: [
                {
                  id: 42,
                  image_required: false,
                  question:
                    'What is your budget framework for the floor plan renovation (renovation includes demolition and reconstruction, wiring, tiles, and flooring)? In everything we do, we always make sure you get the best value for money. $ 5000  - $ 10000  $ 10000  - $ 15000 $ 15000  - $ 20000 More than $ 20000 ',
                },
              ],
              wrap: [
                {
                  id: 43,
                  image_required: false,
                  question:
                    'Did we miss out on anything? Please feel free to write about your apartment renovation.',
                },
              ],
            },
            type: 'S',
          },
          quantity: 1,
          price: 449,
          category_id: 1,
          attributes: {},
        },
      },
      {
        id: 2,
        quantity: 1,
        price: 179,
        additional_data: {
          floor_plan:
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
          images: [
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
            'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-577160911.jpg',
          ],
          questions: [
            {
              id: 44,
              image_required: false,
              section: 'general',
              answer: 'answer...',
              question:
                'Have you already set up a budget for lighting fixtures? We suggest you think about this beforehand.',
            },
            {
              id: 45,
              image_required: false,
              section: 'general',
              answer: 'answer...',
              question:
                'What kind of lighting do you generally prefer - lamps, sconce lights, chandeliers? Attach direct links or images of the style you would love to have.',
            },
            {
              id: 46,
              image_required: true,
              section: 'general',
              answer: 'answer...',
              question: 'Would you like to have built-in lighting?',
            },
            {
              id: 47,
              image_required: false,
              section: 'general',
              answer: 'answer...',
              question: 'Any additional thoughts regarding',
            },
          ],
        },
        shopping_cart_id: 1,
        product: {
          id: 4,
          name: 'lighting',
          format: {},
          data: {
            description: '...',
          },
          additional_data: {
            questions: {
              general: [
                {
                  id: 44,
                  image_required: false,
                  question:
                    'Have you already set up a budget for lighting fixtures? We suggest you think about this beforehand.',
                },
                {
                  id: 45,
                  image_required: false,
                  question:
                    'What kind of lighting do you generally prefer - lamps, sconce lights, chandeliers? Attach direct links or images of the style you would love to have.',
                },
                {
                  id: 46,
                  image_required: true,
                  question: 'Would you like to have built-in lighting?',
                },
                {
                  id: 47,
                  image_required: false,
                  question: 'Any additional thoughts regarding',
                },
              ],
            },
          },
          quantity: 1,
          price: 179,
          category_id: 2,
          attributes: {},
        },
      },
    ],
    additional_data: {
      first_name: 'Petar',
      last_name: 'Mijovic',
      assignee_first_name: null,
      assignee_last_name: null,
    },
  },
  {
    id: 2,
    datetime: 'Tue, 01 Sep 2020 20:09:27 GMT',
    state: 'new',
    user_id: 4,
    line_items: [
      {
        id: 3,
        quantity: 1,
        price: 179,
        additional_data: {
          floor_plan: 'link_to_flor_plan',
          images: ['link1', 'link2'],
          questions: [
            {
              id: 1,
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: false,
              images: null,
              answer: 'odgovor na pitanje',
            },
            {
              quesiton: 'text originalnog pitanja',
              section: 'sekcija u kojoj se nalazi originalno pitanje',
              image_required: true,
              images: ['slika_link'],
              answer: 'odgovor na pitanje',
            },
          ],
        },
        shopping_cart_id: 3,
        product: {
          id: 4,
          name: 'lighting',
          format: {},
          data: {
            description: '...',
          },
          additional_data: {
            questions: {
              general: [
                {
                  id: 44,
                  image_required: false,
                  question:
                    'Have you already set up a budget for lighting fixtures? We suggest you think about this beforehand.',
                },
                {
                  id: 45,
                  image_required: false,
                  question:
                    'What kind of lighting do you generally prefer - lamps, sconce lights, chandeliers? Attach direct links or images of the style you would love to have.',
                },
                {
                  id: 46,
                  image_required: true,
                  question: 'Would you like to have built-in lighting?',
                },
                {
                  id: 47,
                  image_required: false,
                  question: 'Any additional thoughts regarding',
                },
              ],
            },
          },
          quantity: 1,
          price: 179,
          category_id: 2,
          attributes: {},
        },
      },
    ],
    additional_data: {
      first_name: 'Petar',
      last_name: 'Mijovic',
      assignee_first_name: null,
      assignee_last_name: null,
    },
  },
];
// TODO: Replace this with your own data model type
export interface AdminOrdersItem {
  id: string | number;
  customer: string;
  date: string | Date;
  orderValue: string;
  status: number;
  onProject: string;
  orderDetails: any;
}

export class AdminOrders implements AdminOrdersItem {
  id: string | number;
  customer: string;
  date: string | Date;
  orderValue: string;
  status: number;
  onProject: string;
  orderDetails: any;
  constructor(order: any) {
    this.id = order.id;
  }
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AdminOrdersItem[] = [
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
  {
    id: 1,
    customer: 'Petar Mijovic',
    date: '15.06.2020.',
    orderValue: '1$',
    status: 0,
    onProject: 'Natasa Nikolic',
    orderDetails: 'masivni detalji',
  },
];

/**
 * Data source for the AdminOrders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminOrdersDataSource extends DataSource<AdminOrdersItem> {
  data: any[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(data?: any[]) {
    super();
    if (data) this.data = data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AdminOrdersItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AdminOrdersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AdminOrdersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.customer, b.customer, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

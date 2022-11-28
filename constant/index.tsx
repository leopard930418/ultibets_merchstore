export const sizeData: Array<string> = ['S', 'M', 'L', 'XL', 'XXL'];

export type TEESDATA = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  code?: string;
  material?: string;
  fitting_style?: string;
  washing_temperature?: string;
  weight?: number;
  printing?: string;
  printing_dimension?: string;
  size?: string;
  capacity?: string;
};

// t shirts (men/women): 250g
// hoodies: 500g
// Cap: 100g
// Mug: 250g

// Men Hoodies:
// Material: 50% Cotton / 50% Polyester
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 280g/m²
// Printing: High-Quality Serigraphy
// Printing Dimension: 28 x 36 cm

// Women T-Shirts:
// Material: 100% Cotton
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 150g/m²
// Printing: High-Quality Serigraphy
// Printing Dimension: 22 x 36 cm

// Caps:
// Material: 100% Cotton
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 155 g/m²
// Printing: High-Quality Color Transfer
// Printing Dimension: 8,5 x 5 cm

// Mug:
// Material: Ceramic
// Size: Ø 8,2 x 9,6 cm
// Capacity: 350 ml
// Washing Temperature: Dish-Washer Compatible

export const TeesData: Array<TEESDATA> = [
  {
    id: '1',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/svgs/man-tee-one.svg',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '2',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/svgs/man-tee-two.svg',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '3',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/svgs/man-tee-three.svg',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '4',
    name: 'Ultibets Women T-Shirt ',
    price: 29.99,
    image: '/images/svgs/woman-tee-one.svg',
    description: 'Ultibets Logo Women T-Shirt',
    code: 'women-tshirt',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '22 x 36 cm',
  },
  {
    id: '5',
    name: 'Ultibets Women T-Shirt',
    price: 29.99,
    image: '/images/svgs/woman-tee-two.svg',
    description: 'Ultibets Logo Women T-Shirt',
    code: 'women-tshirt',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '22 x 36 cm',
  },
  {
    id: '6',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/svgs/hoodie-one.svg',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '7',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/svgs/hoodie-two.svg',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '8',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/svgs/hoodie-three.svg',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '9',
    name: 'Ultibets Cap',
    price: 19.99,
    image: '/images/svgs/cap.svg',
    description: 'Ultibets Logo Cap',
    code: 'cap',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 100,
    printing: 'High-Quality Color Transfer',
    printing_dimension: '8,5 x 5 cm',
  },
  {
    id: '10',
    name: 'Ultibets Mug',
    price: 14.49,
    image: '/images/svgs/mug.svg',
    description: 'Ultibets Logo Mug',
    code: 'mug',
    material: 'Ceramic',
    size: ' 8.2 x 9.6 cm',
    capacity: '350 ml',
    weight: 100,
    washing_temperature: 'Dish-Washer Compatible',
  },
];

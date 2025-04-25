import ad from "./assets/cast.png";
import gel from "./assets/gel.jpg";
import keratin from "./assets/keratin.jpg"
import neem from "./assets/neem.jpg"
import rose from './assets/rose.png'

const productsData = [
  {
    id: 1,
    name: "Organic Hair Fall Protection Oil",
    size: "120ml",
    price: 1500,
    image: ad,
    inStock: true,
    type: "Hair Care",
    isPopular: true,
    rating: 67
  },
  // {
  //       image: product3,
  //       brand: "TYPEBEA G1",
  //       name: "Overnight Boosting Peptide Serum 100ml",
  //       price: "$80.00",
  //       rating: 11,
  //     },
  {
    id: 2,
    name: "Herbal Hair Fall Protection Shampoo",
    size: "260ml",
    price: 850,
    inStock: true,
    image: rose,
    type: "Hair Care",
    rating: 140
    
  },
  {
    id: 3,
    name: "Organic Keratin Enriched Hair Oil",
    size: "120ml",
    price: 1500,
    image: neem,
    inStock: false,
    type: "Deals",
    rating: 200
  },
  {
    id: 4,
    name: "Moisturizing Hair Mask",
    size: "200g",
    price: 1200,
    inStock: true,
    image: keratin,
    type: "Hair Care",
    rating: 100
  },
  {
    id: 5,
    name: "Volumizing Shampoo",
    size: "300ml",
    price: 900,
    inStock: true,
    type: "Hair Care",
    image: gel,
    rating: 50
  },
  {
    id: 6,
    name: "Argan Oil Hair Serum",
    size: "100ml",
    price: 1800,
    inStock: false,
    type: "Deals",
    image: ad,
    rating: 70
  },
  {
    id: 7,
    name: "Coconut Oil Hair Treatment",
    size: "150ml",
    price: 600,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 120
  },
  {
    id: 8,
    name: "Anti-Dandruff Shampoo",
    size: "250ml",
    price: 750,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 80
  },
  {
    id: 9,
    name: "Color Protection Conditioner",
    size: "200ml",
    price: 950,
    inStock: false,
    image: ad,
    type: "Deals",
    rating: 60
  },
  {
    id: 10,
    name: "Scalp Detox Serum",
    size: "80ml",
    price: 2000,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 40
  },
  {
    id: 11,
    name: "Hydrating Hair Mist",
    size: "150ml",
    price: 1100,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 30
  },
  {
    id: 12,
    name: "Repairing Hair Mask",
    size: "180g",
    price: 1300,
    inStock: false,
    image: ad,
    type: "Deals",
    rating: 90
  },
  {
    id: 13,
    name: "Smoothing Hair Oil",
    size: "100ml",
    price: 1400,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 150
  },
  {
    id: 14,
    name: "Herbal Hair Tonic",
    size: "200ml",
    price: 800,
    inStock: true,
    image: ad,
    type: "Hair Care",
    rating: 150
  },
  {
    id: 15,
    name: "Deep Conditioning Treatment",
    size: "220g",
    price: 1600,
    inStock: false,
    image: ad,
    type: "Deals",
    rating: 40
  },
];

export default productsData;
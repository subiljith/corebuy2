import { Product, CategoryItem } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaLkgAnxko1XoFnSKINdbKVgksYzQJ2Qq6zKDJ8wce7gvrX5kwQAos8MwoEwyslnAKE1e0xi8L5ECTDAj8SFVFPbfxZsRhq6ntkd4U16SGrKeZBWGT2hguA2V-KJ_ZYYFZ4w6QA9lKYbc8nbPihA8ru48OdZuqLfjn3Dt3Ofu-hH5WJBmFetjVk6H3AScql84epl7zb8niNJs2IY-5CnIfoIWo0YQKj7Pe5gB8CTQh7URJirG7_vkGSiBq1JnsvU5r';

export const LOGO_ICON_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6u3Me5-QGjKxXFhXF-n3bsiOoRywLJtfh8btgYhtzkdbCpBuCxZWZ7_nbjQviXN-LuxzYLKHp9KcrvttxGCzrzr7l9vHfFf5xJlTLj5xQXlO6FHD5HZCoNHP-hMqswrg3vb3gSNaHKxydNUNr02Cw0FEOOjvlriv5R28nvdoS4oANYHNjMX6IPSzhg64JB39L1-xIBMl00Re5JxiFHCgPhd5inop3o0Pr5KRb3CGSxHL-Qxxgze-rzHBMkZxOhdK';

export const HERO_BANNER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwT6Fx6wXevcy4SnBdRWYll4kIIXtV5UFnjcCEXE3Tnmi4HT6JM8UH3LkPe2ncOSPRHCFF151PIP2wN1TBESl4cMsdROQLXKJNhXUzgFLK94xQizoOwQ0KuNybmASgPqdXbtcJiUiYr5iW3gwAvcH740w7CAc3T9DXzsLZxoQVfd83MEDITb_J336kPpD3b9ZarysXHRHBFNO13TnT1LeUkAUJieBGP2dE2XffzEi7lquz0R6NxO8';

export const HERO_BANNER_IMG_2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLHhv3naw-JLD7GpkemuiBNizZPrJ_DFnOhBw-2pe2wcnbGD50SERfr_4RB9pun5NxFj4ZGFKnveWnRjDxP1qMtBHN9kB-FoxKC9IIF1xRpdMP94anfPXwPi8KLAAf7ZI1odswMdCOYDFkzkVow7AwYzb2FMbjtnNOwYijr4i1QRPXj0zYfhebYvAj6nRyZpHm53kArqx1mbfOGvCAvPH7UhCwlRKnh_JXmfWr6EzBhDUsElR0GIU';

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'footwear' as const,
    label: 'Footwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-woXXKDxPaizeinHfBxTUCxRcmqz5_QvhXhZn5DO1u3iNXfRIgEONPSW5OtlwgWok1c4oF7s9qtyWDel4ze-kU9JnQ9eot7HM7KskiygETvcB6_LDKW3WuXiAEUqkQxKahIVLCt4vEg8Kkye4753HQEHerxxYWehMBgCyMUKrOe3PFkxk7ycZVessJzmKxGRa_DIlJIqD-Pw5cLNGEOYAVYwQ8bVWe10HIaHdZqR8eals0_hzmg',
    count: '18 items'
  },
  {
    id: 'apparel' as const,
    label: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA5FDdLT6qQJAlLNzDUTyrkndYhYdEjG0T5ZWvy9r4hlyPKEqnGv6985YOW49_cmVVETqI7d0KXCTWzikhFbLAD9-vnyktwmhSdpaUQ9baDEJY3qm8KcjMMMHXIvCn4H0G8SvIFtgoblEAlwYEQOqQu9P20gxkHjOeSpWhEHf2wgtMnxR6hbbLDYH5ImxnJ34VVjTyckJkv1YXeMXUx3lagJ6wa9n_SO_jSnqk_eLKEnMfK2wmPD4',
    count: '34 items'
  },
  {
    id: 'accessories' as const,
    label: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBrJN2tVkgBIqqH6zq9OrsGd-IOO0Ea-8FpT90B5l_VQUr87rZgWsNnI_zHC93Ibqgzo6yYpdNm3t53xQNOT6oIr9A1w530deV9YKWwuEXMyZn3ZyNEKfzjBYUMNGEjAL4W7YlUYVAw4eXNxf1vAJGJnIK7vME-gDLJ60R7vQ-l18VipUDBcbE37xoWDxvPzfS8swvApTo85UIWY3VasRIfr76AIblu4WHuN87wkVuUOzqHQnZ-g',
    count: '22 items'
  },
  {
    id: 'equipment' as const,
    label: 'Equipment',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBanv9DV1tV5nGC8KsLwT7tr0kkaYGcVZoq_no3mrNGW_QcH5jTplcWD_1W4H76nNt6Pys5XAUiysYd4QfhrsWGHt2rux39j9Lvnr-lJP1Q7ZQor6jlJgSrQcJw1ofd7mvSnjD7OgKb1Rs7Y295OJFU-QQyyJZHm0qdqkTkYZz2ZV7D7DD9pvWBFgUs7ZxZ9hCppsH1is9ilPlvFHJyjamBAxk5-GdS75TJTRPvtjKfQZnxCoGksio',
    count: '15 items'
  },
  {
    id: 'training' as const,
    label: 'Training',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV66f8CpuT2M22CJ16HN7SVD_2a6pLz0obO2jOllgV8MNiUvpahN0wEc7t4zDJjfZIAHKBejwlToqRrjq2RLhGGtHfrfOAYKvct5Oubms9ZxI5_5JNCSTSfe7SmbFcNyiclFI9YyyaxFSvkl28F3NBcNoDiALhoANvEYGepFXBNlL3LhrlGCvhMQYbNhPaulm5sh4lmzhbN-UT6StoI3RiFi8UFlCL7wP4rgJaST7HL9wmP7wHIlM',
    count: '12 items'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'corebuy-aerotee-orange',
    name: 'CoreBuy Pro AeroTee',
    brand: 'CoreBuy Pro',
    category: 'apparel',
    categoryLabel: "Men's Training",
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHPcBLg82LJOsZP62wF2zZ6dYzUU54qtRgqB8IsBY6vj9OL1r6ZIzn30R1khuv997HVs3CnxbZT5MU4sXSs6JPCGz_J8s3u9tGU-SCY99cbpg21gz7DMmIGuKWEcHi6JnZ-TR1SxCyzGRTAIQoDo08Fi-zoDplDq4Ga0y_soXWvFBNqcdjVQPo8J5gd-7l52ZrBKZkhaNPJfd4QoDiEZwsTSjZ90glw-xi1yNYaxEBgF2Wv_-6Kg',
        alt: 'CoreBuy Pro AeroTee Main Front View'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqci0qRZWwVuOqmRa4NHFSzYebpkd7_IrRBM3IJLBuR45Vm3JoN9iRV8bcaLZ_1CYq7p6sHrsawF8FEBBvG0A3kC8M_syboQ1JaOiNZ9fowoP2T9oRWm2wRoVcbsBP7w0BF1Z64ovNpzaKG2-DnaBb78eqU8ItM-GMp46n8A2rFggU5ltpyfXitVmKFiYiTpIR3peDgBwIVS8h2bgeOEKosoWdfnydJPQC_W5zdKTkiNXx8tCcpks',
        alt: 'Chest and Ventus branding detail'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2My-eAwEyNHzmjt3qGS1bCcIkgM96xlM7jsykyB8EaDValEK2B54fll3vnYr2hsqvX_bM2CZlCh8iMrDAhYt_9H2RTVFz1axAaIgLXNzpVtqMvdTCWRtFiWy0kGBFDxjTHXlgBcyjsSnhQJE_ZJ1q3htVUarPNaccZCREQwkghzvEzuA1Pk2lSHPSzmR52i3-918DVfl1vdJgv5jD_k9DY4_ehulmm-S1RWABjNVCGQblKbS4M-g',
        alt: 'Ergonomic breathable mesh spine panel back view'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKoITOUufPRiqdeHWFTAD_xBLZ1f-W_80Wke0uYz65AV7OWPDtW7PkeIMH9KJwGfJgh1yRSYYEuIj45EJT7KYUd5uKRkqZo6Bck0q-yp0x9Fn59YRh04KKq0gFzXaZLvSOOhCQSQnlesPp9LismSy_VOl7V50GZMUkOsCL8IVawxzyrrJxDnHrz4eju55OWVjUk5GuAsYbVOHBoeoq8J4v1-xG2iB8kN8qcSJwWF_MXR5avTR5oSg',
        alt: 'Intricate moisture-wicking technical weave texture'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4Kue1Xom6SG_WwoCsTpq-euyZnDglAbEKOVKE5FaJlOMfrbfXR2ojTjoMTFmuEIPmQOuVL0aCWi_wJ_0tt7CpHq--p9p4RX5PjtYp2kKKpxZ8pnvCVt8vQ5_B2w917hbo6aM_COXffXOI-E2T9efnShUReruoCDPnZ0oQ5iv3GScSIGW-zwmmEVLsV0v-ZO35yp1LpbPxq7wrzDHIY_P-ZsNYLDVEXamS9RNanFo9AqEUMPdcPEc',
        alt: 'Athlete mid-sprint track demo video preview',
        type: 'video'
      }
    ],
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true, note: 'Few Left' },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false }
    ],
    color: 'Sporty Blaze Orange',
    description: 'Engineered for high-intensity training, the CoreBuy Pro AeroTee features our proprietary moisture-wicking technology to keep you dry when the heat is on. The ergonomic seam placement prevents chafing, while the lightweight mesh back panel ensures maximum breathability. Built for athletes who demand more from their gear.',
    fabricCare: [
      '88% Polyester, 12% Elastane',
      'Machine wash cold with like colors',
      'Do not use fabric softeners',
      'Tumble dry low',
      'Do not iron'
    ],
    replacementPolicy: 'Not the perfect fit? We offer a hassle-free 7-day replacement policy on all apparel. Items must be unworn, unwashed, and have original tags attached. Initiate a return easily through your account dashboard.',
    isTrending: true
  },
  {
    id: 'phantom-x-runners',
    name: 'CoreBuy Phantom X Runners',
    brand: 'CoreBuy',
    category: 'footwear',
    categoryLabel: 'Footwear',
    price: 4999,
    originalPrice: 6249,
    discountPercent: 20,
    badge: '-20%',
    badgeType: 'discount',
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmqXn0v4gWSJwjmEgHX5xylesKVIUwcArVDZGFV91kNzaAUlXXgU32jIeKGzOxgscwGU7FgzwEpLVSocSska8BrJq0qHeTHqbDALDihTqBkhm53Hp-txDO9N4ue2QwuHN-NdIkIh2hd5-gTTjHgntdTIo_uNv_AQU6MovptlaWkhCZplgTMNxYjNuG9Al9V7280piV6fgXXbbvt8oadV5VEOkdXflShABFRMGMhaO226MUpaj6ICo',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmqXn0v4gWSJwjmEgHX5xylesKVIUwcArVDZGFV91kNzaAUlXXgU32jIeKGzOxgscwGU7FgzwEpLVSocSska8BrJq0qHeTHqbDALDihTqBkhm53Hp-txDO9N4ue2QwuHN-NdIkIh2hd5-gTTjHgntdTIo_uNv_AQU6MovptlaWkhCZplgTMNxYjNuG9Al9V7280piV6fgXXbbvt8oadV5VEOkdXflShABFRMGMhaO226MUpaj6ICo',
        alt: 'CoreBuy Phantom X Runners White Orange'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-woXXKDxPaizeinHfBxTUCxRcmqz5_QvhXhZn5DO1u3iNXfRIgEONPSW5OtlwgWok1c4oF7s9qtyWDel4ze-kU9JnQ9eot7HM7KskiygETvcB6_LDKW3WuXiAEUqkQxKahIVLCt4vEg8Kkye4753HQEHerxxYWehMBgCyMUKrOe3PFkxk7ycZVessJzmKxGRa_DIlJIqD-Pw5cLNGEOYAVYwQ8bVWe10HIaHdZqR8eals0_hzmg',
        alt: 'Side Profile sole cushioning'
      }
    ],
    sizes: [
      { label: 'UK 7', available: true },
      { label: 'UK 8', available: true },
      { label: 'UK 9', available: true, note: 'Few Left' },
      { label: 'UK 10', available: true },
      { label: 'UK 11', available: false }
    ],
    color: 'Volt White / Blaze Orange',
    description: 'Precision-engineered road and marathon runners equipped with dual-density kinetic nitrogen-infused foam. Aerodynamic mesh delivers 360-degree ventilation while the carbon-composite sprint plate returns maximum propulsion on every stride.',
    fabricCare: [
      'Engineered jacquard mono-mesh upper',
      'Dual nitrogen rebound midsole',
      'Wipe clean with a damp cloth',
      'Air dry away from direct sunlight'
    ],
    replacementPolicy: 'Free 7-day size exchange and trial policy. Try on carpeted indoor surfaces before road testing.',
    isTrending: true
  },
  {
    id: 'aeroknit-tee-black',
    name: 'AeroKnit Training Tee - Black',
    brand: 'CoreBuy Volt',
    category: 'apparel',
    categoryLabel: 'Apparel',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRy2TGbyrRN4Zyewz71bRr09s-JCaeHq4sYfwfFkiL27YVDAG07OBqxeLNk0hHulch1CumfqY7ZnNBYDFvPgAoA9MPeT7X5tvuzhTPBsxoZzdD_T0pvsSzWQW8nct-XaFNPy0s31n7rV1WYPI0rfZJSSXd2JUlkO1T9DPvWvGnpoF_5A6sf_37zhjM7qgcc4u1e_7TcazHfvQb8QrQY1_bTVN06VnwYzonwqc5FPxZADacQP_P0Kg',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRy2TGbyrRN4Zyewz71bRr09s-JCaeHq4sYfwfFkiL27YVDAG07OBqxeLNk0hHulch1CumfqY7ZnNBYDFvPgAoA9MPeT7X5tvuzhTPBsxoZzdD_T0pvsSzWQW8nct-XaFNPy0s31n7rV1WYPI0rfZJSSXd2JUlkO1T9DPvWvGnpoF_5A6sf_37zhjM7qgcc4u1e_7TcazHfvQb8QrQY1_bTVN06VnwYzonwqc5FPxZADacQP_P0Kg',
        alt: 'AeroKnit Training Tee Stealth Black'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA5FDdLT6qQJAlLNzDUTyrkndYhYdEjG0T5ZWvy9r4hlyPKEqnGv6985YOW49_cmVVETqI7d0KXCTWzikhFbLAD9-vnyktwmhSdpaUQ9baDEJY3qm8KcjMMMHXIvCn4H0G8SvIFtgoblEAlwYEQOqQu9P20gxkHjOeSpWhEHf2wgtMnxR6hbbLDYH5ImxnJ34VVjTyckJkv1YXeMXUx3lagJ6wa9n_SO_jSnqk_eLKEnMfK2wmPD4',
        alt: 'AeroKnit fabric flat lay'
      }
    ],
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true }
    ],
    color: 'Stealth Black',
    description: 'Clean commercial cut athletic training tee crafted with ultra-fine microfiber that draws sweat immediately away from skin. Designed with ergonomic raglan sleeves for unrestricted arm rotations during lifts and sprints.',
    fabricCare: [
      '92% Poly-blend, 8% Spandex',
      'Cold wash inside out',
      'Do not bleach or dry clean'
    ],
    replacementPolicy: '7-day hassle-free replacement with instant pickup in all major metros across India.',
    isTrending: true
  },
  {
    id: 'pro-gear-duffle-40l',
    name: 'Pro Gear Duffle Bag 40L',
    brand: 'CoreBuy',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 2299,
    originalPrice: 3299,
    discountPercent: 30,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    rating: 4.85,
    reviewsCount: 178,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcbYWH6zIlGF8i1iA3iILw1RSNfTkWFFMo77Tt8rZ6GZt1f7UqBcos_GGr2VzX0R3pN87mWD2VA3BkoLvwVnZ_WWWld1Vb7fYo5aH0McZYUcoB1l61RomC7gaELGRgVUpGk9ea2GOIcmcZy4zrmMwDEsTLecQ9wGxlS7uwcEQVfJXv5kLxuG6hZUJJ223W50YATgsiE4qsxhXp-6vY_oIj6-1txDcZMoHWbEIaV-nUqFlYLgqEw-E',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcbYWH6zIlGF8i1iA3iILw1RSNfTkWFFMo77Tt8rZ6GZt1f7UqBcos_GGr2VzX0R3pN87mWD2VA3BkoLvwVnZ_WWWld1Vb7fYo5aH0McZYUcoB1l61RomC7gaELGRgVUpGk9ea2GOIcmcZy4zrmMwDEsTLecQ9wGxlS7uwcEQVfJXv5kLxuG6hZUJJ223W50YATgsiE4qsxhXp-6vY_oIj6-1txDcZMoHWbEIaV-nUqFlYLgqEw-E',
        alt: 'Pro Gear Duffle Bag 40L with Orange Straps'
      }
    ],
    sizes: [
      { label: '40L OSFA', available: true }
    ],
    color: 'Matte Black / Blaze Orange',
    description: 'High-capacity 40-liter athletic duffle engineered with water-resistant 900D ballistic nylon. Features an isolated ventilated shoe tunnel, waterproof wet-gear compartment, and padded ergonomic shoulder harness.',
    fabricCare: [
      '900D Ballistic Cordura-grade Nylon',
      'YKK Heavy-duty weather-sealed zippers',
      'Spot clean with mild soapy water'
    ],
    replacementPolicy: '1-Year comprehensive brand warranty covering seams, straps, and zippers.',
    isTrending: true
  },
  {
    id: 'velocity-shield-helmet',
    name: 'CoreBuy Shield Pro Helmet',
    brand: 'CoreBuy Shield',
    category: 'equipment',
    categoryLabel: 'Equipment',
    price: 3499,
    originalPrice: 4499,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjHD3o9O01Qc6u3jVbmZ5D7YS-geC4DCigdYofu6Z_BNbK8Bjp54sTgAfCPMgQpYxzvSFrrqFf_Yq0DJ0n1vokCtKbe6y_Shhix5fWPzcc2HwkRt5ZTPXAR1BIeKlyd-5tYCd7IYRfK0-Ybuqgb7tTiw3Xb3W9c1UF7OsDGXSlHUF9MaPdNAH7_8hJZsSWssh8hejxxKPi6t3WhAlsJiB-xx3u0QfM9sseu9E4RRRvt9Je8YWqOJM',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjHD3o9O01Qc6u3jVbmZ5D7YS-geC4DCigdYofu6Z_BNbK8Bjp54sTgAfCPMgQpYxzvSFrrqFf_Yq0DJ0n1vokCtKbe6y_Shhix5fWPzcc2HwkRt5ZTPXAR1BIeKlyd-5tYCd7IYRfK0-Ybuqgb7tTiw3Xb3W9c1UF7OsDGXSlHUF9MaPdNAH7_8hJZsSWssh8hejxxKPi6t3WhAlsJiB-xx3u0QfM9sseu9E4RRRvt9Je8YWqOJM',
        alt: 'CoreBuy Shield Pro Cricket Helmet Matte Black'
      }
    ],
    sizes: [
      { label: 'M (56-58cm)', available: true },
      { label: 'L (58-61cm)', available: true }
    ],
    color: 'Matte Tactical Black',
    description: 'BCCI and ICC compliant cricket protection helmet built with high-impact molded ABS shell and titanium-reinforced grill for uncompromised field vision and impact dispersal.',
    fabricCare: [
      'Reinforced EPS inner foam core',
      'Removable sweatband liner - washable',
      'Store in protective helmet bag'
    ],
    replacementPolicy: '7-day replacement for fit assurance; certified safety gear.',
    isTrending: true
  },
  {
    id: 'velocity-aerospeed-pro',
    name: 'Velocity AeroSpeed Pro',
    brand: 'Velocity Pro',
    category: 'footwear',
    categoryLabel: 'Footwear',
    price: 5499,
    originalPrice: 6999,
    discountPercent: 21,
    badge: 'New Arrival',
    badgeType: 'new',
    rating: 4.95,
    reviewsCount: 64,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXqS6YjNGzt34xAehuqEd41MXEtpvYMM85-raLwE_DsR0fLWzG5vluxDL-nm84wFdYrCaUHg-9ZzwbH3S9E5yp6v5gWZh-SehBRjadWORbawKGNeGjqyTytheiW8FsdJqaHEAp8pllzLaNHaRVEzo7XnZEN0CmDCjP4--_4x7jW0Mk8vLQXLnPHKN7BjAMzAMbtpXxlZhJwiL-mJ6eED87KxCriBOndz_gAJjEWEYkuKMBAivcHY',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXqS6YjNGzt34xAehuqEd41MXEtpvYMM85-raLwE_DsR0fLWzG5vluxDL-nm84wFdYrCaUHg-9ZzwbH3S9E5yp6v5gWZh-SehBRjadWORbawKGNeGjqyTytheiW8FsdJqaHEAp8pllzLaNHaRVEzo7XnZEN0CmDCjP4--_4x7jW0Mk8vLQXLnPHKN7BjAMzAMbtpXxlZhJwiL-mJ6eED87KxCriBOndz_gAJjEWEYkuKMBAivcHY',
        alt: 'Velocity AeroSpeed Pro Running Shoes Volt White'
      }
    ],
    sizes: [
      { label: '8 UK', available: true },
      { label: '9 UK', available: true, note: 'Few Left' },
      { label: '10 UK', available: true }
    ],
    color: 'Volt White / Neon Orange',
    description: 'Competition-grade sprint and tempo footwear engineered with hyper-lightweight mesh and full-length carbon rocker plate for elite energy return.',
    fabricCare: ['Synthetic upper mesh', 'Spot clean only'],
    replacementPolicy: '7-day replacement policy on unworn footwear.',
    isTrending: false
  },
  {
    id: 'core-tech-training-tee',
    name: 'Core Tech Training Tee',
    brand: 'CoreBuy',
    category: 'apparel',
    categoryLabel: 'Apparel',
    price: 1299,
    originalPrice: 1799,
    discountPercent: 28,
    rating: 4.6,
    reviewsCount: 77,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOGXkJLUd5eqFuunmbmvIoK4usacZIpEs0_NVWylklArYFCf0BfyJXF-GvrjzjI3hZLrZufQhFWvjwX1sKxNCr8qf3qGkvYXFhsjni4s-SQ4Ba_vch7z9XNec3D9wwUXZBEMTrheh6OuubsNBKVNe2nw-P0cjlpY8I7wyJ-prI2AOwxQpOLmmtcpOHxs79tB323dEFlZvf93CMzI1QyvrEAKsClfOg3arSgXw7uh-wAZhdmCkh40k',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOGXkJLUd5eqFuunmbmvIoK4usacZIpEs0_NVWylklArYFCf0BfyJXF-GvrjzjI3hZLrZufQhFWvjwX1sKxNCr8qf3qGkvYXFhsjni4s-SQ4Ba_vch7z9XNec3D9wwUXZBEMTrheh6OuubsNBKVNe2nw-P0cjlpY8I7wyJ-prI2AOwxQpOLmmtcpOHxs79tB323dEFlZvf93CMzI1QyvrEAKsClfOg3arSgXw7uh-wAZhdmCkh40k',
        alt: 'Core Tech Training Tee Stealth Grey'
      }
    ],
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true }
    ],
    color: 'Stealth Grey',
    description: 'High-density knit fabric providing thermoregulating cooling during strenuous gym and field sessions.',
    fabricCare: ['Polyester and Elastane blend', 'Machine wash cold'],
    replacementPolicy: '7-day replacement policy.',
    isTrending: false
  },
  {
    id: 'speed-gear-set',
    name: 'Velocity Dynamic Headband & Tracker Strap',
    brand: 'CoreBuy',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 899,
    originalPrice: 1299,
    discountPercent: 30,
    rating: 4.7,
    reviewsCount: 52,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBrJN2tVkgBIqqH6zq9OrsGd-IOO0Ea-8FpT90B5l_VQUr87rZgWsNnI_zHC93Ibqgzo6yYpdNm3t53xQNOT6oIr9A1w530deV9YKWwuEXMyZn3ZyNEKfzjBYUMNGEjAL4W7YlUYVAw4eXNxf1vAJGJnIK7vME-gDLJ60R7vQ-l18VipUDBcbE37xoWDxvPzfS8swvApTo85UIWY3VasRIfr76AIblu4WHuN87wkVuUOzqHQnZ-g',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBrJN2tVkgBIqqH6zq9OrsGd-IOO0Ea-8FpT90B5l_VQUr87rZgWsNnI_zHC93Ibqgzo6yYpdNm3t53xQNOT6oIr9A1w530deV9YKWwuEXMyZn3ZyNEKfzjBYUMNGEjAL4W7YlUYVAw4eXNxf1vAJGJnIK7vME-gDLJ60R7vQ-l18VipUDBcbE37xoWDxvPzfS8swvApTo85UIWY3VasRIfr76AIblu4WHuN87wkVuUOzqHQnZ-g',
        alt: 'Sports Watch & Blaze Headband Set'
      }
    ],
    sizes: [
      { label: 'Universal Fit', available: true }
    ],
    color: 'Blaze Orange / Stealth Black',
    description: 'Sweat-channeling silicone gripped headband paired with breathable hypoallergenic sport band for fitness trackers.',
    fabricCare: ['Silicone & Spandex blend', 'Rinse with cold water'],
    replacementPolicy: '7-day replacement policy.',
    isTrending: false
  },
  {
    id: 'cricket-willow-pro',
    name: 'CoreBuy English Willow Bat & Pro Ball',
    brand: 'CoreBuy Cricket',
    category: 'equipment',
    categoryLabel: 'Equipment',
    price: 8499,
    originalPrice: 10999,
    discountPercent: 23,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    rating: 4.95,
    reviewsCount: 140,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBanv9DV1tV5nGC8KsLwT7tr0kkaYGcVZoq_no3mrNGW_QcH5jTplcWD_1W4H76nNt6Pys5XAUiysYd4QfhrsWGHt2rux39j9Lvnr-lJP1Q7ZQor6jlJgSrQcJw1ofd7mvSnjD7OgKb1Rs7Y295OJFU-QQyyJZHm0qdqkTkYZz2ZV7D7DD9pvWBFgUs7ZxZ9hCppsH1is9ilPlvFHJyjamBAxk5-GdS75TJTRPvtjKfQZnxCoGksio',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBanv9DV1tV5nGC8KsLwT7tr0kkaYGcVZoq_no3mrNGW_QcH5jTplcWD_1W4H76nNt6Pys5XAUiysYd4QfhrsWGHt2rux39j9Lvnr-lJP1Q7ZQor6jlJgSrQcJw1ofd7mvSnjD7OgKb1Rs7Y295OJFU-QQyyJZHm0qdqkTkYZz2ZV7D7DD9pvWBFgUs7ZxZ9hCppsH1is9ilPlvFHJyjamBAxk5-GdS75TJTRPvtjKfQZnxCoGksio',
        alt: 'Grade 1 English Willow Cricket Bat with Leather Match Ball'
      }
    ],
    sizes: [
      { label: 'Short Handle (SH)', available: true },
      { label: 'Harrow', available: true }
    ],
    color: 'Natural Wood / Match Crimson',
    description: 'Handcrafted Grade 1 English Willow bat with extended sweet spot and thick contoured edges. Supplied with 4-piece alum tanned match ball.',
    fabricCare: ['Keep oiled with raw linseed oil', 'Store in moisture-free bat sleeve'],
    replacementPolicy: 'Comprehensive 6-month handle warranty.',
    isTrending: false
  },
  {
    id: 'kettlebell-mat-combo',
    name: 'Apex Grip Kettlebell & Pro Mat',
    brand: 'CoreBuy Training',
    category: 'training',
    categoryLabel: 'Training',
    price: 3299,
    originalPrice: 4299,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV66f8CpuT2M22CJ16HN7SVD_2a6pLz0obO2jOllgV8MNiUvpahN0wEc7t4zDJjfZIAHKBejwlToqRrjq2RLhGGtHfrfOAYKvct5Oubms9ZxI5_5JNCSTSfe7SmbFcNyiclFI9YyyaxFSvkl28F3NBcNoDiALhoANvEYGepFXBNlL3LhrlGCvhMQYbNhPaulm5sh4lmzhbN-UT6StoI3RiFi8UFlCL7wP4rgJaST7HL9wmP7wHIlM',
    gallery: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV66f8CpuT2M22CJ16HN7SVD_2a6pLz0obO2jOllgV8MNiUvpahN0wEc7t4zDJjfZIAHKBejwlToqRrjq2RLhGGtHfrfOAYKvct5Oubms9ZxI5_5JNCSTSfe7SmbFcNyiclFI9YyyaxFSvkl28F3NBcNoDiALhoANvEYGepFXBNlL3LhrlGCvhMQYbNhPaulm5sh4lmzhbN-UT6StoI3RiFi8UFlCL7wP4rgJaST7HL9wmP7wHIlM',
        alt: 'Kettlebell and High-Density Yoga Mat Training Combo'
      }
    ],
    sizes: [
      { label: '12 KG + 8mm Mat', available: true },
      { label: '16 KG + 8mm Mat', available: true }
    ],
    color: 'Cast Black / Blaze Detail',
    description: 'Cast-iron single-piece kettlebell with wide textured grip handle and 8mm high-density non-slip alignment training mat.',
    fabricCare: ['Wipe clean after use'],
    replacementPolicy: '7-day replacement on manufacturing defects.',
    isTrending: false
  }
];

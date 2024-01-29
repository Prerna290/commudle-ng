/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'com-',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Adding custom colors to the tailwind config. by www.color-name.com */
        primary: {
          100: '#d6e0ff',
          200: '#adc2ff',
          300: '#85a3ff',
          400: '#5c85ff',
          500: '#3366ff',
          600: '#2952cc',
          700: '#1f3d99',
          800: '#142966',
          900: '#0a1433',
        },
        'Spiro-Disco': '#1ac7e340',
        'Brilliant-Azure': '#2aa5ff',
        'Caribbean-Green': '#00d68f',
        gunmetal: 'var(--color-gunmetal)', // gunmetal: '#2f2e41', //Change
        'Silver-Sand': '#c4c4c4',
        'Azureish-White': '#dae0ff',
        'Very-Light-Blue': '#536eff',
        'Sonic-Silver': 'var(--color-sonic-silver)', // 'Sonic-Silver': '#777777',
        'Blue-Jeans': ' #29a5ff',
        'Raisin-Black': 'var(--color-raisin-black)', // 'Raisin-Black': '#231f20',
        'Spanish-Gray': 'var(--color-spanish-gray)', // 'Spanish-Gray': '#979797',
        'Ultramarine-Blue': '#3366FF',
        Azure: '#0095ff',
        Blueberry: '#4e74ff',
        'Dark-Spring-Green': 'var(--color-dark-spring-green)', // 'Dark-Spring-Green': '#10654c',
        'Blue-Violet': '#6F22DF',
        Blond: '#FFF1BB',
        'Black-Coral': 'var(--color-black-coral)', // 'Black-Coral': '#595867',
        Charcoal: 'var(--color-charcoal)', // Charcoal: '#344054',
        'Auro-Metal-Saurus': 'var(--color-auro-metal-saurus)', // 'Auro-Metal-Saurus': '#667085',
        'tAuro-Metal-Saurus': '#667085', //It will remain same,
        'Dark-Jungle-Green': 'var(--color-dark-jungle-green)', // 'Dark-Jungle-Green': '#101828',
        'Light-Silver': '#D0D5DD',
        'Bright-Gray-Light': '#EAECF0',
        'Crayola-Green': '#1B9F68',
        'Vampire-Black': 'var(--color-vampire-black)', // 'Vampire-Black': '#0A0A0A',
        'Anti-Flash-White': '#f2f2f2',
        'Yankees-Blue': 'var(--color-yankees-blue)', // 'Yankees-Blue': '#222B45',
        'tYankees-Blue': 'var(--color-tyankees-blue)', //Remain yankees-blue
        'Alice-Blue': '#EDF5FF',
        'New-Car': 'var(--color-new-car)', // 'New-Car': '#1D4ED8',
        'Bright-Gray': '#E4E9F2', // 'Bright-Gray': 'var(--color-bright-gray)',
        'Brandeis-Blue': '#0074ED',
        'Chrome-Yellow': '#FFAA00',
        'Infra-Red': '#FF3D71',
        AuroMetalSaurus: '#667085',
        Lavender: '#E6F1FF',
        Quartz: 'var(--color-quartz)', // Quartz: '#4B4B5C',
        'Chocolate-Traditional': 'var(--color-chocolate-traditional)', // 'Chocolate-Traditional': '#7D4402',
        Seashell: '#FFF6EB',
        'Metallic-Bronze': '#AC7D47',
        'Tigers-Eye': '#DF913F',
        'Blanched-Almond': '#FFEECD',
        'Deep-Carmine-Pink': '#FF3333',
        'Bleu-De-France': '#2590EB',
        'Giants-Orange': '#ff5c1e',
        Blue: '#001FFF',
        Bittersweet: '#FF725E',
        'American-Orange': '#FF8A00',
        'Blue-Lotus': '#635BFF', //used in stripe connect button for now
        'Catalina-Blue': '#022C7D', //'Catalina-Blue': 'var(--color-catalina-blue)'
        'Alice-Blue-Dark': '#EBF5FF',
        white: 'var(--color-white)',
        tWhite: 'var(--color-twhite)', //Remain white in dark mode
        black: 'var(--color-black)',
        'blue-50': 'var(--color-blue-50)',
        'gray-900': 'var(--color-gray-900)',
        'gray-50': 'var(--color-gray-50)',
        'gray-500': 'var(--color-gray-500)',
        'gray-100': 'var(--color-gray-100)',
        'gray-700': 'var(--color-gray-700)',
        'gray-800': 'var(--color-gray-800)',
        'gray-600': 'var(--color-gray-600)',

        // 'Spiro-Disco': '#1ac7e340', //used only in profile-status-bar.component
        // 'Very-Light-Blue': '#536eff', //Used only in home-commumity.component
        // 'Blue-Jeans': ' #29a5ff', //used only in user-work-history
        // 'Dark-Spring-Green': '#10654c', //Used only in looking-for-work-tags
        // 'Blue-Violet': '#6F22DF', //used only in hiring-in-work-tags
        // Blond: '#FFF1BB', //Used only in common-classes.component
        // 'Light-Silver': '#D0D5DD', //only used for borders, can be replaced with bright-gray
        // 'New-Car': '#1D4ED8', //used only in alert.component
        // 'Brandeis-Blue': '#0074ED', //Doesnot get used
        // AuroMetalSaurus: '#667085', //Doesnot get used
        // Lavender: '#E6F1FF', //Doesnot get used
        // Seashell: '#FFF6EB', //USed only in community-builds
        // 'Metallic-Bronze': '#AC7D47', //Used only in builds-header
        // 'Tigers-Eye': '#DF913F', //Doesnot get used
        // 'Blanched-Almond': '#FFEECD', //Only used in builds-header
        // 'Bleu-De-France': '#2590EB', //Only used in lab-deatils.component
        // 'Giants-Orange': '#ff5c1e', //Only used in chats-list
        // Blue: '#001FFF', //Can be replaced
        // Bittersweet: '#FF725E', //USed only in speakers-header
        // 'Blue-Lotus': '#635BFF', //used only in stripe connect button for now
        // 'Alice-Blue-Dark': '#EBF5FF', //Used only in labs.component

        //Define dark variables for the below mentioned colours
        // gunmetal: 'var(--color-gumental)',
        // 'Brilliant-Azure': 'var(--color-brilliant-azure)',
        // 'Spiro-Disco': 'var(--color-spiro-disco)',
        // 'Caribbean-Green': 'var(--color-caribbean-green)',
        // 'Azureish-White': 'var(--color-azureish-white)',
        // 'Very-Light-Blue': 'var(--color-very-light-blue)',
        // 'Blue-Jeans': 'var(--color-blue-jeans)',
        // 'Ultramarine-Blue': 'var(--color-ultramarine-blue)',
        // Blueberry: 'var(--color-blueberry)',
        // 'Blue-Violet': 'var(--color-blue-violet)',
        // Blond: 'var(--color-blond)',
        // 'Light-Silver': 'var(--color-light-silver)',
        // 'Bright-Gray-Light': 'var(--color-bright-gray-light)',
        // 'Crayola-Green': 'var(--color-crayola-green)',
        // 'Anti-Flash-White': 'var(--color-anti-flash-white)',
        // 'Alice-Blue': 'var(--color-alice-blue)',
        // 'Chrome-Yellow': 'var(--color-chrome-yellow)',
        // 'Infra-Red': 'var(--color-infra-red)',
        // Seashell: 'var(--color-seashell)',
        // 'Metallic-Bronze': 'var(--color-metallic-bronze)',
        // 'Blanched-Almond': 'var(--color-blanced-almond)',
        // 'Deep-Carmine-Pink': 'var(--color-deep-carmine-pink)',
        // 'Bleu-De-France': 'var(--color-bleu-de-france)',
        // 'Giants-Orange': 'var(--color-giants-orange)',
        // Blue: 'var(--color-blue)',
        // Bittersweet: 'var(--color-bittersweet)',
        // 'American-Orange': 'var(--color-american-orange)',
        // 'Alice-Blue-Dark': 'var(--color-alice-blue-dark)',
      },

      lineClamp: {
        14: '14',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-22': 'span 22 / span 22',
      },
      fontSize: {
        /* This is a custom font size. */
        'Public-Page-CTA-Heading': '60px',
        'Page-Heading': '36px',
        'Page-Section-Header': '24px',
        'Page-Subheading': '20px',
        'Card-Subheading': '18px',
        'Paragraph-1': '16px',
        'Paragraph-2': '14px', //Button text, Input
        Caption: '12px',
        '10px': '10px',
        '8px': '8px',
      },
      spacing: {
        /* Adding custom spacing to the tailwind config. */
        '2px': '2px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '9px': '9px',
        '10px': '10px',
        '14px': '14px',
        '17px': '17px',
        '20px': '20px',
        '30px': '30px',
        '39px': '39px',
        '56px': '56px',
        '68px': '68px',
        '72px': '72px',
        '76px': '76px',
        '78px': '78px',
        '86px': '86px',
        '120px': '120px',
        '140px': '140px',
        '152px': '152px',
        '156px': '156px',
        '169px': '169px',
        '212px': '212px',
        '220px': '220px',
        '260px': '260px',
        '264px': '264px',
        '296px': '296px',
        '300px': '300px',
        '307px': '307px',
        '318px': '318px',
        '336px': '336px',
        '340px': '340px',
        '500px': '500px',
        '630px': '630px',
        '800px': '800px',
        '95vh': '95vh',
        '50vw': '50vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '95vw': '95vw',
        '100vw': '100vw',
      },
      borderWidth: {
        /* Setting the default border width to 1px and 3px. */
        DEFAULT: '1px',
        3: '3px',
      },
      lineHeight: {
        /* Adding custom line height to the tailwind config. */
        '14px': '14px',
        '21px': '21px',
        '30px': '30px',
      },
      boxShadow: {
        /* Adding a box shadow to the element. */
        Card: '0 5px 15px #dae0ff',
        'Chat-box': '0 7px 29px 0 #64646f33 ',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    // TODO: remove after upgrading tailwind v3.3
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
  corePlugins: {
    preflight: false,
  },
};

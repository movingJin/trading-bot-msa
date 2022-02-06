export default {};
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import BotCard from '@components/TradingBot/BotCard';

// const MyBotWrapper = styled.div`
//   width: 100%;
//   height: 20rem;
// `;

// const SliderWrapper = styled.div`
//   .slick-prev:before,
//   .slick-next:before {
//     color: black;
//   }
// `;

// export const MybotBoard = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     variableWidth: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   return (
//     <MyBotWrapper>
//       <SliderWrapper>
//         <h2> Multiple items </h2>
//         <Slider {...settings}>
//           <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
//           <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
//           <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
//           <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
//         </Slider>
//       </SliderWrapper>
//     </MyBotWrapper>
//   );
// };

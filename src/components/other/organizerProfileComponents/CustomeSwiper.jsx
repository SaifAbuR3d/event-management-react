import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import EventCard from "../../cards/EventCard";

export default function CustomeSwiper({ slides }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
      }}
      pagination={{ dynamicBullets: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      style={{ position: "relative", paddingBottom: "2%" }}
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
            <EventCard
              name={slide.name}
              isOnline={slide.isOnline}
              startDate={slide.startDate}
              startTime={slide.startTime}
            />
          </SwiperSlide>
        );
      })}

      <IconButton
        className="swiper-button-next"
        aria-label="edit"
        color="secondary"
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          zIndex: "1",
        }}
      >
        <ArrowForwardIos fontSize="large" />
      </IconButton>
      <IconButton
        className="swiper-button-prev"
        aria-label="edit"
        color="secondary"
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          zIndex: "1",
        }}
      >
        <ArrowBackIos fontSize="large" />
      </IconButton>
    </Swiper>
  );
}

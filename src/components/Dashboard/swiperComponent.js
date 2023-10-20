import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PatientCreationHistory from './PatientCreationHistory';
import AppointmentHistory from './AppointmentHistory';
import DiagnosisHistory from './CountICD';

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function SwiperComponent() {
  return (
    <div className="patient-creation-history">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      >
        <SwiperSlide>
          <PatientCreationHistory />
        </SwiperSlide>
        <SwiperSlide>
          <AppointmentHistory />
        </SwiperSlide>
        <SwiperSlide>
          <DiagnosisHistory />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SwiperComponent;

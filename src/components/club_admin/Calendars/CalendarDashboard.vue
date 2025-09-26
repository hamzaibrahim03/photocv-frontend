<template>
  <div class="calendar" :style="{ '--border-color': '#7FA483' }">
    <!-- Calendar Header -->
    <div
      class="calendar-header"
      :style="{
        backgroundColor: '#7FA483',
        color: 'white',
      }"
    >
      <button
        class="previous"
        @click="prevMonth"
        :style="{
          backgroundColor: '#7FA483',
          color: 'white',
        }"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <button
        class="next"
        @click="nextMonth"
        :style="{
          backgroundColor: '#7FA483',
          color: 'white',
        }"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <!-- Weekdays -->
    <!-- Weekdays -->
    <div class="calendar-grid weekdays">
      <div
        v-for="(day, idx) in weekDays"
        :key="day"
        class="weekday"
        :style="idx === 0 ? { color: '#DD9757' } : {}"
      >
        {{ day }}
      </div>
    </div>
    <!-- Days -->
    <div class="calendar-grid days">
      <div
        v-for="n in firstDayOffset"
        :key="'empty-' + n"
        class="day empty"
      ></div>
            <div
        v-for="day in daysInMonth"
        :key="day"
        class="day hoverable"
        :style="isSunday(day) ? { color: '#DD9757' } : {}"
        >
        <!-- Event Labels -->
        <div class="labels-container">
          <div
  v-if="eventsByDate[`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`]"
  class="event-labels"
>
  <div
    v-for="ev in eventsByDate[`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`]"
    :key="ev.eventName"
    class="event-label"
    :style="{ color: '#7FA483', backgroundColor: 'white' }"
  >
    {{ ev.eventName }}
  </div>
</div>


          <!-- Day Number -->
          <span
            class="day-number"
            :class="{ 'today-badge': isToday(day) }"
            :style="
              isToday(day)
                ? {
                    backgroundColor: '#7FA483',
                    color: 'white',
                  }
                : {}
            "
          >
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template> <script setup>
import { computed, ref } from "vue";
import { useDashboardStore } from "@/stores/club_admin/DashboardStore"; 
const dashboardStore = useDashboardStore(); 
const Events = computed(() => dashboardStore.dashboardData?.data?.events || []); 
const Comps = computed(() => dashboardStore.dashboardData?.data?.competitions || []);

const isToday = (day) => { 
  return ( 
    day === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear() ); 
    }; 
    const events = computed(() => Events.value.map(event => ({ date: new Date(event.event_date), eventName: event.name, dateColor: event.color || "#99816B", })) ); 
    const comps = computed(() => Comps.value.map(comp => ({ date: new Date(comp.start_date), eventName: comp.name, dateColor: comp.color || "#CC445E", })) ); 
    const isSunday = (day) => { const date = new Date(currentYear.value, currentMonth.value, day); return date.getDay() === 0; 
    }; 
    const allEvents = computed(() => [...events.value, ...comps.value]); // Calendar logic 
    const today = new Date(); const currentMonth = ref(today.getMonth()); 
    const currentYear = ref(today.getFullYear()); 
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"]; 
    const daysInMonth = computed(() => { return new Date(currentYear.value, currentMonth.value + 1, 0).getDate(); }); 
    const firstDayOffset = computed(() => { return new Date(currentYear.value, currentMonth.value, 1).getDay(); });
const eventsByDate = computed(() => {
  let grouped = {};
  allEvents.value.forEach(ev => {
    const y = ev.date.getFullYear();
    const m = String(ev.date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
    const d = String(ev.date.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });
  return grouped;
});

const prevMonth = () => { if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value--; } else { currentMonth.value--; } }; 
const nextMonth = () => { if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++; } else { currentMonth.value++; } };
</script> 
<style scoped>
.calendar {
  border-radius: 10px;
  margin: 0;
  font-family: sans-serif;
}
h2 {
  margin-top: 2%;
  font-size: 22px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0%;
}
.calendar-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 15px;
}
.days {
  margin-top: 10px;
}
.labels-container {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 4px;
  margin-top: 4px;
}
.previous,
.next {
  font-size: 28px;
  width: 40px;
  height: 40px;
  align-items: center;
  border: none;
}
.weekdays {
  font-weight: bold;
  text-align: center;
  margin-top: 35px;
}
.day {
  min-height: 48px;
  text-align: center;
  padding: 4px;
  position: relative;
  border: 2px solid transparent;
}
.day-number {
  font-size: 16px;
  border-radius: 7px;
  border: 2px solid transparent;
  display: flex;
  width: 38px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.day.hoverable:hover span {
  border: 2px solid var(--border-color);
  cursor: pointer;
}
.today-badge {
  border-radius: 7px;
  display: inline-block;
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.event-labels {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  gap: 2px;
  z-index: 2;
}
.event-label {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
.day.hoverable:hover .event-labels {
  display: flex;
}
</style>
<template>
<!-- Calendar -->
<div 
  class="calendar" 
  :style="{ '--border-color': Color.primary_color }"
>
  <!-- Calendar Header -->
  <div class="calendar-header" 
       :style="{backgroundColor: Color.primary_color, color: Color.background_color}">
    <button class="previous" 
            @click="prevMonth" 
            :style="{backgroundColor: Color.primary_color, color: Color.background_color}">
      ‹
    </button>
    <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
    <button class="next" 
            @click="nextMonth" 
            :style="{backgroundColor: Color.primary_color, color: Color.background_color}">
      ›
    </button>
  </div>

  <!-- Weekdays -->
  <div class="calendar-grid weekdays">
    <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
  </div>

  <!-- Days -->
  <div class="calendar-grid days">
    <div v-for="n in firstDayOffset" :key="'empty-' + n" class="day empty"></div>

    <div 
      v-for="day in daysInMonth" 
      :key="day" 
      class="day hoverable"
      :title="getEventsTooltip(day)"
    >
      <span class="day-number" :class="{ 'today-badge': isToday(day) }">
        {{ day }}
      </span>
    </div>
  </div>
</div>

</template>

<script setup>
import {
    computed,
    ref
} from "vue";
import {
    useHomeStore
} from "@/stores/ClubData"; // update path

const homeStore = useHomeStore();

const Events = computed(() => homeStore.homeData?.data?.upcomingEvents || []);
const Comps = computed(() => homeStore.homeData?.data?.upcomingCompetitions || []);
const Color = computed(() => homeStore.clubSettings || {});
const isToday = (day) => {
    return (
        day === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear()
    );
};

const events = computed(() =>
    Events.value.map(event => ({
        date: new Date(event.event_date),
        eventName: event.name,
        dateColor: event.color || "#99816B",
    }))
);

const comps = computed(() =>
    Comps.value.map(comp => ({
        date: new Date(comp.start_date),
        eventName: comp.name,
        dateColor: comp.color || "#CC445E",
    }))
);

const allEvents = computed(() => [...events.value, ...comps.value]);
const getEventsTooltip = (day) => {
  const key = `${currentYear.value}-${currentMonth.value}-${day}`;
  if (!eventsByDate.value[key]) return "";
  return eventsByDate.value[key].map(ev => ev.eventName).join(", ");
};


// Calendar logic
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// Group events by date
const eventsByDate = computed(() => {
    let grouped = {};
    allEvents.value.forEach(ev => {
        const key = `${ev.date.getFullYear()}-${ev.date.getMonth()}-${ev.date.getDate()}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(ev);
    });
    return grouped;
});


const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
};

const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
};
</script>

<style scoped>
.calendar {
    border-radius: 10px;
    margin: auto;
    font-family: sans-serif;
}

h2 {
    margin-top: 2%;
    font-size: 22px;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0%
}

.calendar-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.previous,
.next {
    font-size: 28px;
    width: 40px;
    height: 40px;
    align-items: center;
    border: none
}

.weekdays {
    font-weight: bold;
    text-align: center;
    margin-top: 7px;
}

.day {
  min-height: 42px;
  text-align: center;
  padding: 4px;
  position: relative;
  width: 40px;
  border: 2px solid transparent; /* default */
  transition: border 0.2s ease-in-out;
}

.day-number {
  font-size: 16px;
}

/* Hover effect */
.day.hoverable:hover {
  border: 2px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  height: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}


</style>

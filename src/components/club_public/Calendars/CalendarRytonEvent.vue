<template>
    <div class="calendar" :style="{ '--border-color': Color.primary_color }">

        <div class="calendar-header" :style="{ backgroundColor: Color.primary_color, color: Color.background_color, }">
            <button class="previous" @click="prevMonth" :style="{ backgroundColor: Color.primary_color, color: Color.background_color, marginLeft: '10px' }">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
            <button class="next" @click="nextMonth" :style="{ backgroundColor: Color.primary_color, color: Color.background_color, marginRight: '10px' }">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>

        <div class="calendar-grid weekdays">
            <div v-for="(day, idx) in weekDays" :key="day" class="weekday" :style="idx === 0 ? { color: Color.accent_color } : {}" >
                {{ day }}
            </div>
        </div>

        <div class="calendar-grid days">
            <div v-for="n in firstDayOffset" :key="'empty-' + n" class="day empty" ></div>

            <div v-for="day in daysInMonth" :key="day" class="day hoverable" :class="getDayClass(day)" :style="isSunday(day) ? { color: Color.accent_color } : {}">
                
                <div class="labels-container">
                    <div v-if="eventsByDate[`${currentYear}-${currentMonth}-${day}`]" class="event-labels">
                        <div v-for="ev in eventsByDate[`${currentYear}-${currentMonth}-${day}`]" :key="ev.eventName" class="event-label" :style="{ color: ev.type === 'events' ? Color.accent_color : Color.primary_color, backgroundColor: Color.background_color }">
                            {{ ev.eventName }}
                        </div>
                    </div>

                    <span class="day-number" :class="{ 'today-badge': isToday(day) }" :style=" isToday(day) ? { backgroundColor: Color.primary_color, color: Color.background_color, } : {} ">
                        {{ day }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRytonEventStore } from "@/stores/club_public/RytonEvent";

const rytoneventStore = useRytonEventStore();
const Color = computed(() => rytoneventStore.eventData?.data?.clubSettings?.original?.data.settings || {});

const today = new Date();
const systemMonth = today.getMonth(); 
const systemYear = today.getFullYear();

const currentMonth = ref(systemMonth);
const currentYear = ref(systemYear);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const calendarData = computed(() => rytoneventStore.eventData?.data?.calendar || {});

const allEvents = computed(() => {
  const currentKey = `${systemYear}-${String(systemMonth + 1).padStart(
    2,
    "0"
  )}`;
  const currentMonthData = calendarData.value?.[currentKey] || {
    events: [],
    competitions: [],
  };

  const parseEvents = (monthData, type) =>
    (monthData[type] || []).map((ev) => ({
      date: new Date(ev.date),
      eventName: ev.name,
      type,
    }));

  return [
    ...parseEvents(currentMonthData, "events"),
    ...parseEvents(currentMonthData, "competitions"),
  ];
});

const eventsByDate = computed(() => {
  let grouped = {};
  allEvents.value.forEach((ev) => {
    const key = `${ev.date.getFullYear()}-${ev.date.getMonth()}-${ev.date.getDate()}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });
  return grouped;
});

const isToday = (day) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

const isSunday = (day) => {
  const date = new Date(currentYear.value, currentMonth.value, day);
  return date.getDay() === 0;
};

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

const getDayClass = (day) => {
  const key = `${currentYear.value}-${currentMonth.value}-${day}`;
  const events = eventsByDate.value[key];

  if (!events) return "";

  if (events.some((ev) => ev.type === "competitions")) {
    return "has-competition";
  } else if (events.some((ev) => ev.type === "events")) {
    return "has-event";
  }
  return "";
};


onMounted(async () => {
  console.log(calendarData);
});
</script>



<style scoped>
.calendar {
  border-radius: 10px;
  margin: auto;
  font-family: sans-serif;
  padding-bottom: 10px
}

h2 {
  margin-top: 2%;
  letter-spacing: 0%;
  font-family: Inter;
    font-weight: 500;
    font-style: Medium;
    font-size: 24px;
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
  margin-top: -10px;
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
  width: 40px;
  height: 40px;
  align-items: center;
  border: none;
}

.weekdays {
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
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
  width: 40px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.day.hoverable:not(.has-event):not(.has-competition):hover .day-number {
  border: 2px solid var(--border-color);
  cursor: pointer;
}

.today-badge {
  border-radius: 7px;
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
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

.day.has-event .day-number {
  border: 2px solid var(--border-color); 
}

.day.has-competition .day-number {
  border: 2px solid v-bind('Color.primary_color');
}

.day.has-event .day-number {
  border: 2px solid v-bind('Color.accent_color');
}

.day.has-competition:hover .event-labels {
  display: flex;
  color: v-bind('Color.primary_color');
}

.day.has-event:hover .event-labels {
  display: flex;
  color: v-bind('Color.accent_color');
}


@media only screen and (max-width: 575px) {
  .day-number {
    width: 35px;
  }
}
</style>

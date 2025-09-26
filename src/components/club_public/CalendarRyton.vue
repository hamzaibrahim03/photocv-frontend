<template>
  <div class="calendar" :style="{ '--border-color': Color.primary_color }">
    <!-- Calendar Header -->
    <div
      class="calendar-header"
      :style="{
        backgroundColor: Color.primary_color,
        color: Color.background_color,
      }"
    >
      <button
        class="previous"
        @click="prevMonth"
        :style="{
          backgroundColor: Color.primary_color,
          color: Color.background_color,
        }"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <button
        class="next"
        @click="nextMonth"
        :style="{
          backgroundColor: Color.primary_color,
          color: Color.background_color,
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
        :style="idx === 0 ? { color: Color.accent_color } : {}"
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
        :style="isSunday(day) ? { color: Color.accent_color } : {}"
        >
        <!-- Event Labels -->
        <div class="labels-container">
          <div
            v-if="eventsByDate[`${currentYear}-${currentMonth}-${day}`]"
            class="event-labels"
          >
            <div
              v-if="eventsByDate[`${currentYear}-${currentMonth}-${day}`]"
              class="event-label"
              :style="{
                color:
                  eventsByDate[`${currentYear}-${currentMonth}-${day}`]
                    .length === 1
                    ? Color.primary_color
                    : Color.accent_color,
                backgroundColor: Color.background_color,
              }"
            >
              {{
                eventsByDate[`${currentYear}-${currentMonth}-${day}`].length ===
                1
                  ? eventsByDate[`${currentYear}-${currentMonth}-${day}`][0]
                      .eventName
                  : eventsByDate[`${currentYear}-${currentMonth}-${day}`]
                      .map((ev) => ev.eventName)
                      .join(", ")
              }}
            </div>
          </div>

          <!-- Day Number -->
          <span
            class="day-number"
            :class="{ 'today-badge': isToday(day) }"
            :style="
              isToday(day)
                ? {
                    backgroundColor: Color.primary_color,
                    color: Color.background_color,
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
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useHomeStore } from "@/stores/club_public/ClubData";

const homeStore = useHomeStore();
const Color = computed(() => homeStore.clubSettings || {});

// ✅ System (real) month/year
const today = new Date();
const systemMonth = today.getMonth(); // Sept = 8
const systemYear = today.getFullYear();

// ✅ Calendar navigation state
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

// Calendar structure
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// API calendar data
const calendarData = computed(() => homeStore.homeData?.data?.calendar || {});

// ✅ Events only from system's real month (not navigated month)
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

// Group events by date
const eventsByDate = computed(() => {
  let grouped = {};
  allEvents.value.forEach((ev) => {
    const key = `${ev.date.getFullYear()}-${ev.date.getMonth()}-${ev.date.getDate()}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });
  return grouped;
});

// Helpers
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

// Navigation
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

onMounted(async () => {
  console.log(calendarData);
});
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
  width: 40px;
  height: 32px;
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

@media only screen and (max-width: 575px) {
  .day-number {
    width: 35px;
  }
}
</style>

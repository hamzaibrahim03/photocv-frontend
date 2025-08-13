<template>
<div class="col-md-8">
    <div class="p-3" id="news">
        <div class="news-list">
            <div class="form-containers">
                <form @submit.prevent="submitForm">
                    <div class="row">
                        <div class="col-md-4">
                            <img :src="featured_image" alt="Meeting" />
                        </div>
                        <div class="col-md-8 mb-3">
                            <label for="names"> Event Name </label>
                            <input type="text" v-model="name" class="form-control" />
                            <div class="divider3"></div>
                            <label for="date"> Event Date </label>
                            <input type="date" v-model="event_date" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <div class="row" style="
                            background-color: #99816b33;
                            margin-top: 15px;
                            border-radius: 7px;
                            padding: 10px;
                            margin-left: 2px;">
                        <h5>Event Description</h5>
                        <textarea  v-model="description" style="border: none; background-color: transparent;">
                            
                        </textarea>
                        
                    </div>
                    <div class="divider3"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="kind"> Event Kind </label>
                            <input type="number" class="form-control" v-model="event_kind_id" />
                        </div>
                        <div class="col-md-6">
                            <label for="type"> Event Type </label>
                            <input type="number" class="form-control" v-model="event_type_id" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label for="duration"> Event Duration </label>
                            <input type="text" v-model="duration" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label for="Speaker"> Event Speaker </label>
                            <input type="text" v-model="speaker" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label for="club"> Event Speaker Club </label>
                            <input type="text" v-model="speaker_club" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label for="Qualifications">
                                Event Speaker Qualifications
                            </label>
                            <input type="text" v-model="speaker_qualification" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <label for="event_status">Event Status</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="scheduled" ref="statusscheduled" v-model="status" class="icheck-status" />&nbsp;
                                        <span>Schdule</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="draft" ref="statusdraft" v-model="status" class="icheck-status" />&nbsp;
                                        <span>Draft</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="tbc" ref="statustbc" v-model="status" class="icheck-status" />&nbsp;
                                        <span>TBC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="cancelled" ref="statuscancelled" v-model="status" class="icheck-status" />&nbsp;
                                        <span>Cancelled</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="completed" ref="statuscompleted" v-model="status" class="icheck-status" />&nbsp;
                                        <span>Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <label for="gear"> Gear Required </label>
                    <input type="text" v-model="required_gear" class="form-control" />

                    <div class="container col-md-12 mb-3">
                        <label for="tags">Tags/Keywords</label>
                        <div class="tag-dropdown" @click="toggleDropdown">
                            <div id="tagContainer" class="d-flex flex-wrap">
                                <div v-for="(tag, index) in selectedTags" :key="index" class="tag">
                                    {{ tag }}
                                    <button @click.stop="removeTag(index)">✖</button>
                                </div>
                            </div>
                            <input type="text" v-model="searchInput" placeholder="Search..." class="sea" @focus="showDropdown = true" />
                        </div>
                        <div class="dropdown" v-if="showDropdown">
                            <ul class="dropdown-menu show">
                                <li v-if="filteredTags.length === 0" style="color: gray">
                                    No results found
                                </li>
                                <li v-for="(tag, index) in filteredTags" :key="index" @click="addTag(tag)">
                                    {{ tag }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="divider3"></div>
                    <label for="link"> Link to related Page </label>
                    <input type="url" v-model="url" class="form-control" />
                    <div class="divider3"></div>
                    <label for="RSVP"> RSVP Details </label>
                    <textarea class="form-control" v-model="rsvp_detail"></textarea>

                    <div class="divider3"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="imageUpload">
                                Image to be chosen
                                <small>(1 of default 4 to be used if no image)</small>
                            </label>
                            <input type="file" id="imageUpload" class="form-control" @change="handleImageUpload" :disabled="images.length >= 4" multiple />
                        </div>
                    </div>

                    <div class="divider3 my-3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Attachments</label>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-12">
                            <div id="imagePreview" class="d-flex gap-2 flex-wrap">
                                <div v-for="(img, index) in images" :key="index" class="position-relative border rounded p-1" style="width: 60px; height: 60px; background: #f8f9fa">
                                    <img :src="img" alt="Preview" class="img-fluid" style="width: 100%;
                        height: 100%; object-fit: cover;border-radius: 4px;" />
                                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 translate-middle" style="padding: 0px 6px; font-size: 12px" @click="removeImage(index)">
                                        ✖
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider3"></div>

                    <p><input type="checkbox" />&nbsp;&nbsp;Enable Dropbox uploads</p>
                    <div class="button-group">
                        <button class="btn me-2" id="view">Back</button>
                        <button type="submit" class="btn" id="edit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import apiClient from '@/api/axios'
/* global $ */

export default {
    name: "EventsForm",
    data() {
        return {
            selectedTags: [],
            allTags: [
                "Urgent",
                "Meeting",
                "Reminder",
                "Policy Update",
                "Holiday Notice",
                "Exam Schedule",
            ],
            searchInput: "",
            showDropdown: false,
            images: [],
            featured_image:'',
            name: '',
            event_date: '',
            event_kind_id: '',
            event_type_id: '',
            description: '',
            duration: '',
            speaker: '',
            speaker_club: '',
            speaker_qualification: '',
            status: '',
            required_gear: '',
            url: '',
            rsvp_detail: '',
            tags_keywords: ''
        };
    },
    computed: {
        filteredTags() {
            const query = this.searchInput.toLowerCase();
            return this.allTags.filter(
                (tag) =>
                tag.toLowerCase().includes(query) && !this.selectedTags.includes(tag)
            );
        },
    },
    methods: {
        async submitForm() {
            const payload = {
                featured_image: this.featured_image,
                name: this.name,
                event_date: this.event_date,
                event_type_id: this.event_type_id,
                event_kind_id: this.event_kind_id,
                description: this.description,
                duration: this.duration,
                status: this.status,
                speaker: this.speaker,
                speaker_club: this.speaker_club,
                speaker_qualification: this.speaker_qualification,
                required_gear: this.required_gear,
                url: this.url,
                rsvp_detail: this.rsvp_detail,
                tags_keywords: this.tags_keywords
            }

            const eventId = this.$route.params.id;

            try {
                if (eventId) {
                    // Edit existing
                    await apiClient.put(`/events/${eventId}`, payload);
                } else {
                    // Create new
                    await apiClient.post(`/events`, payload);
                }

                alert('Event saved successfully!');
                this.$router.push('/event'); // or wherever you want to go

            } catch (error) {
                console.error('Error submitting event:', error);
            }
        },
        async fetchEvent(id) {
            try {
                const response = await apiClient.get(`/events/${id}`)
                const data = response?.data?.data || {}
                const rawDate = data.event_date

                this.featured_image = data.featured_image || ''
                this.name = data.name || ''
                this.event_date = rawDate ? rawDate.substring(0, 10) : ''
                this.event_kind_id = data.event_kind_id || ''
                this.event_type_id = data.event_type_id || ''
                this.description = data.description || ''
                this.duration = data.duration || ''
                this.speaker = data.speaker || ''
                this.speaker_club = data.speaker_club || ''
                this.speaker_qualification = data.speaker_qualification || ''
                this.status = data.status || ''
                this.required_gear = data.required_gear || ''
                this.url = data.url || ''
                this.rsvp_detail = data.rsvp_detail || ''
                this.tags_keywords = data.tags_keywords || ''

                console.log('Populated fields:', data)
            } catch (error) {
                console.error('Error fetching event by ID:', error)
            }
        },
        addTag(tag) {
            if (!this.selectedTags.includes(tag)) {
                this.selectedTags.push(tag);
                this.searchInput = "";
            }
        },
        removeTag(index) {
            this.selectedTags.splice(index, 1);
        },
        toggleDropdown() {
            this.showDropdown = true;
        },
        handleClickOutside(event) {
            const imageWrapper = this.$el.querySelector("#imageWrapper");
            const modal = this.$el.querySelector(".lightbox-modal");

            if (imageWrapper && modal) {
                if (
                    !imageWrapper.contains(event.target) &&
                    !modal.contains(event.target)
                ) {
                    this.showLightbox = false;
                }
            } else {
                this.showLightbox = false;
            }
        },
        handleImageUpload(event) {
            const files = Array.from(event.target.files);

            if (this.images.length + files.length > 4) {
                alert("You can only upload up to 4 images.");
                event.target.value = "";
                return;
            }

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.images.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
            event.target.value = "";
        },
        removeImage(index) {
            this.images.splice(index, 1);
        },
    },
    mounted() {
        const eventId = this.$route.params.id;
        if (eventId) {
            this.fetchEvent(eventId)
        }
        this.$nextTick(() => {
            $('.icheck-status').on('ifChecked', (event) => {
                this.status = event.target.value
            })
        })

        document.addEventListener("click", this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    watch: {
        status(newVal) {
            this.$nextTick(() => {
                $('.icheck-status').iCheck('uncheck')
                $(`.icheck-status[value="${newVal}"]`).iCheck('check')
            })
        }
    }
};
</script>

<style scoped>
.form-control {
    height: 50px;
    font-size: 16.61px;
    font-weight: 400;
    padding: 12px;
    border-radius: 5px;
    color: #4C4036;
    border: 1.04px solid #99816B;
}
</style>

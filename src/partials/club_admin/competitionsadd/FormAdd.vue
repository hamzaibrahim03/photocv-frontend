<template>
<div class="col-md-8">
    <div class="p-3" id="news">
        <div class="news-list">
            <div class="form-containers">
                <form @submit.prevent="submitForm">
                    <h5>Basic Information</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label> Competition Name </label>
                            <input type="text" v-model="name" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Competition Type </label>
                            <input type="number" v-model="competition_type_id" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <label> Competition Description </label>
                    <textarea class="form-control" v-model="description" style="height: 250px"></textarea>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Judging Type </label>
                            <select class="form-control">
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label> Assign Judge </label>
                            <select class="form-control">
                                <option></option>
                                <option>Ammar</option>
                                <option>Sohaib</option>
                                <option>Kamran</option>
                                <option>Sarfraz</option>
                            </select>
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <label for="event_status">Status</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="scheduled" ref="statusscheduled" class="icheck-status" />&nbsp;
                                        <span style="font-size: 5px">scheduled</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="draft" ref="statusdraft" class="icheck-status" />&nbsp;
                                        <span style="font-size: 5px">draft</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="postponed" ref="statuspostponed" class="icheck-status" />&nbsp;
                                        <span style="font-size: 5px">postponed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="cancelled" ref="statuscancelled" class="icheck-status" />&nbsp;
                                        <span style="font-size: 5px">cancelled</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="completed" ref="statuscompleted" class="icheck-status" />&nbsp;
                                        <span style="font-size: 5px">completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <h5>Submission Rules</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label> Start Date & Time </label>
                            <input type="date" class="form-control" v-model="start_date" />
                        </div>
                        <div class="col-md-6">
                            <label> Deadlines for Submissions </label>
                            <input type="date" class="form-control" v-model="submission_deadline" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Max Number of PDI Entries Per Participant </label>
                            <input type="number" v-model="max_entries_digital" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Max Number of PRINT  Per Participant </label>
                            <input type="number" v-model="max_entries_print" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Max File Size </label>
                            <input type="number" v-model="max_file_size" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Allowed Image Formats </label>
                            <select name="formats" id="formats" v-model="allowed_image_formats" class="form-control">
                                <option value="Allowed Image Formats" disabled selected>
                                    Allowed Image Formats
                                </option>
                                <option value="active">Active</option>
                                <option value="enable">Enable</option>
                                <option value="diactive">Diactive</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <h5>Categories and Themes</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label> Theme (If applicable) </label>
                            <input type="number" v-model="theme_id" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Competition Categories </label>
                            <input type="number" v-model="category_id" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Print vs Digital Submission </label>
                            <select name="theme" id="theme" v-model="print_vs_digital" class="form-control">
                                <option value="Themes" disabled selected>print_vs_digital</option>
                                <option value="print">Print</option>
                                <option value="digital">Digital</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label> Colour vs. Monochrome (Any restrictions) </label>
                            <select name="theme" id="theme" v-model="color_vs_mono" class="form-control">
                                <option value="Themes" disabled selected>color_vs_mono</option>
                                <option value="color">Color</option>
                                <option value="monochrome">Monochrome</option>\
                            </select>
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <h5>Judging and Scoring</h5>
                    <label> Judging Panels </label>
                    <textarea class="form-control" v-model="judging_panel"></textarea>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Voting Method </label>
                            <input type="number" v-model="voting_method_id" class="form-control" />
                        </div>
                        <div class="col-md-6"></div>
                    </div>
                    <div class="divider3"></div>

                    <h5>Results & Awards</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label> Announcement Date </label>
                            <input type="date" v-model="result_announcement_date" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Awards - Top Places Available </label>
                            <input type="text" v-model="top_places" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Award - No. of High Commendations Available </label>
                            <input type="number" v-model="high_commendation_number" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label> Awards - Number of Commendations Available </label>
                            <input type="number" v-model="commendation_number" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <label> Prizes (if any) </label>
                            <textarea class="form-control" v-model="prizes"></textarea>
                        </div>
                        <div class="col-md-6"></div>
                    </div>
                    <div class="divider3"></div>
                    <div class="divider3"></div>
                    <div class="divider3"></div>
                    <div class="divider3"></div>

                    <h5>Addtional Features</h5>
                    <div>
                        <p>
                            <input type="checkbox" />
                            Comments & Critique Section (For Consecutive Purpose)
                        </p>
                        <p>
                            <input type="checkbox" />
                            Auto generated Certificates (For Winners & Participants)
                        </p>
                        <p>
                            <input type="checkbox" />
                            Allow Feedback from the judges to be visible to partcipants
                        </p>
                    </div>
                    <div class="button-group">
                        <button class="btn me-2" id="view">Back</button>
                        <button class="btn" id="edit">Save</button>
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
    name: "FormAdd",
    data() {
        return {
            name: '',
            competition_type_id: '',
            description: '',
            judging_type_id: '',
            status: '',
            start_date: '',
            submission_deadline: '',
            max_entries_digital: '',
            max_entries_print: '',
            max_file_size: '',
            allowed_image_formats: '',
            theme_id: '',
            category_id: '',
            print_vs_digital: '',
            color_vs_mono: '',
            judging_panel: '',
            voting_method_id: '',
            result_announcement_date: '',
            top_places: '',
            high_commendation_number: '',
            commendation_number: '',
            prizes: '',
        };
    },
    methods: {
        async submitForm() {
            const payload = {
                name: this.name,
                competition_type_id: this.competition_type_id,
                judging_type_id: this.judging_type_id,
                status: this.status,
                description: this.description,
                start_date: this.start_date,
                submission_deadline: this.submission_deadline,
                max_entries_digital: this.max_entries_digital,
                max_entries_print: this.max_entries_print,
                max_file_size: this.max_file_size,
                allowed_image_formats: this.allowed_image_formats,
                theme_id: this.theme_id,
                category_id: this.category_id,
                print_vs_digital: this.print_vs_digital,
                color_vs_mono: this.color_vs_mono,
                judging_panel: this.judging_panel,
                voting_method_id: this.voting_method_id,
                result_announcement_date: this.result_announcement_date,
                top_places: this.top_places,
                high_commendation_number: this.high_commendation_number,
                commendation_number: this.commendation_number,
                prizes: this.prizes
            }

            const competitionId = this.$route.params.id;

            try {
                if (competitionId) {
                    await apiClient.put(`/competitions/${competitionId}`, payload);
                } else {
                    await apiClient.post(`/competitions`, payload);
                }

                alert('Competition saved successfully!');
                this.$router.push('/competitions');

            } catch (error) {
                console.error('Error submitting competition:', error);
            }
        },
        async fetchFormData(id) {
            try {
                const response = await apiClient.get(`/competitions/${id}`)
                const data = response?.data?.data || {}
                const rawDate = data.result_announcement_date
                const rawDates = data.start_date
                const rawDats = data.submission_deadline

                this.name = data.name || ''
                this.competition_type_id = data.competition_type_id || ''
                this.description = data.description || ''
                this.judging_type_id = data.judging_type_id || ''
                this.status = data.status || ''
                this.start_date = rawDates ? rawDates.substring(0,10) : ''
                this.submission_deadline = rawDats ? rawDats.substring(0,10): ''
                this.max_entries_digital = data.max_entries_digital || ''
                this.max_entries_print = data.max_entries_print || ''
                this.max_file_size = data.max_file_size || ''
                this.allowed_image_formats = data.allowed_image_formats || ''
                this.theme_id = data.theme_id || ''
                this.category_id = data.category_id || ''
                this.print_vs_digital = data.print_vs_digital || ''
                this.color_vs_mono = data.color_vs_mono || ''
                this.judging_panel = data.category_id || ''
                this.voting_method_id = data.voting_method_id || ''
                this.result_announcement_date = rawDate ? rawDate.substring(0, 10) : ''
                this.top_places = data.top_places || ''
                this.high_commendation_number = data.high_commendation_number || ''
                this.commendation_number = data.commendation_number || ''
                this.prizes = data.prizes || ''

                console.log('Populated fields:', data)
            } catch (error) {
                console.error('Error fetching competition by ID:', error)
            }
        },
    },
    mounted() {
        const competitionId = this.$route.params.id;
        if (competitionId) {
            this.fetchFormData(competitionId)
        }
        this.$nextTick(() => {
            $('.icheck-status').on('ifChecked', (event) => {
                this.status = event.target.value
            })
        })
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

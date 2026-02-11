<template>
<div class="col-md-8">
    <div id="news">
        <div class="news-list">
            <div class="form-containers">
                <form @submit.prevent="submitForm">
                    <h5>Basic Information</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="title"> Notice Title </label>
                            <input v-model="title" type="text" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label for="type"> Notice Type </label>
                            <select v-model="type" name="type" id="type" class="form-control">
                                <option value="Notice Type" disabled selected>
                                    - Select -
                                </option>
                                <option value="active">Active</option>
                                <option value="enable">Enable</option>
                                <option value="diactive">Diactive</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="body"> Notice Body </label>
                            <textarea v-model="description" class="form-control"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label for="body"> Notice Body </label>
                            <img :src="featured_image" alt="Notice" />
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="link"> Location </label>
                            <input type="text" v-model="location" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label for="link"> Link to related Page </label>
                            <input type="url" v-model="link_page_url" class="form-control" />
                        </div>
                    </div>
                    <div class="divider3"></div>

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

                    <div class="row">
                        <div class="col-md-6">
                            <label for="image"> Image to be chosen </label>
                            <input type="file" id="imageUpload" class="form-control" @change="handleImageUpload" :disabled="images.length >= 4" multiple />
                        </div>
                        <div class="col-md-6">
                            <label for="image"> Documents to be download </label>
                            <input type="file" id="docUpload" class="form-control" @change="handleDocumentUpload" :disabled="documents.length >= 4" multiple />
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="upload"> Uploaded Images </label>
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
                        </div>
                        <div class="col-md-6">
                            <label for="Attachments"> Attachments </label>
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div id="docPreview" class="d-flex gap-2 flex-wrap">
                                        <div v-for="(doc, index) in documents" :key="index" class="position-relative border rounded p-1" style="width: 60px; height: 60px; background: #f8f9fa">
                                            <img :src="doc" alt="Preview" class="img-fluid" style="width: 100%;
                                            height: 100%; object-fit: cover;border-radius: 4px;" />
                                            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 translate-middle" style="padding: 0px 6px; font-size: 12px" @click="removeDocument(index)">
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <div class="divider3"></div>

                    <h5>Settings</h5>
                    <div class="divider3"></div>

                    <label for="notice_status">Notice Status</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="active" ref="statusactive" class="icheck-status" />&nbsp;
                                        <span style="font-size: 11px">Active</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="draft" ref="statusdraft" class="icheck-status" />&nbsp;
                                        <span style="font-size: 11px">Draft</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="deleted" ref="statusdeleted" class="icheck-status" />&nbsp;
                                        <label style="font-size: 11px">Delete</label>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="scheduled" ref="statusscheduled" class="icheck-status" />&nbsp;
                                        <span style="font-size: 11px">Scheduled</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-control">
                                        <input type="radio" name="status" value="pending" ref="statuspending" class="icheck-status" />&nbsp;
                                        <span style="font-size: 11px">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <label for="notice_poll">Notice Poll</label>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="poll" value="public" ref="pollpublic" class="icheck-poll" />&nbsp;
                                <span style="font-size: 12px">Public</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="poll" value="none" ref="pollnone" class="icheck-poll" />&nbsp;
                                <span style="font-size: 12px">None</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="poll" value="anonymous" ref="pollanonymous" class="icheck-poll" />&nbsp;
                                <span style="font-size: 12px">Anonymous</span>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <label for="notice_urgency">Notice Urgency and Importance</label>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="urgency_importance" value="general" ref="urgencygeneral" class="icheck-urgency" />&nbsp;
                                <span style="font-size: 12px">General</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="urgency_importance" value="urgent" ref="urgencyurgent" class="icheck-urgency" />&nbsp;
                                <span style="font-size: 12px">Urgent</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="urgency_importance" value="important" ref="urgencyimportant" class="icheck-urgency" />&nbsp;
                                <span style="font-size: 12px">Important</span>
                            </div>
                        </div>
                    </div>
                    <div class="divider3"></div>
                    <label for="notice_comment">Notice Comment Allowed</label>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="comment_allowed" value="public" ref="commentpublic" class="icheck-comment" />&nbsp;
                                <span style="font-size: 12px">Public</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="comment_allowed" value="none" ref="commentnone" class="icheck-comment" />&nbsp;
                                <span style="font-size: 12px">None</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-control">
                                <input type="radio" name="comment_allowed" value="anonymous" ref="commentanonymous" class="icheck-comment" />&nbsp;
                                <span style="font-size: 12px">Anonymous</span>
                            </div>
                        </div>
                    </div>

                    <div class="divider3"></div>
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
    name: "NoticeForm",
    data() {
        return {
            title: '',
            type: '',
            description: '',
            featured_image: '',
            location: '',
            link_page_url: '',
            tags: '',
            status: '',
            urgency_importance: '',
            comment_allowed: '',
            poll: '',
            selectedTags: [],
            searchInput: "",
            showDropdown: false,
            images: [],
            documents: [],
            showLightbox: false,
            allTags: ["announcement", "event", "urgent", "school", "community"],
        };
    },
    computed: {
        filteredTags() {
            const query = this.searchInput.toLowerCase();
            return this.allTags.filter(
                (tag) => tag.toLowerCase().includes(query) && !this.selectedTags.includes(tag)
            );
        }
    },
    methods: {
        async submitForm() {
            const payload = {
                title: this.title,
                type: this.type,
                description: this.description,
                featured_image: this.featured_image,
                location: this.location,
                link_page_url: this.link_page_url,
                tags: this.tags,
                status: this.status,
                urgency_importance: this.urgency_importance,
                comment_allowed: this.comment_allowed,
                poll: this.poll
            }

            const noticeId = this.$route.params.id;

            try {
                if (noticeId) {
                    await apiClient.put(`/notices/${noticeId}`, payload);
                } else {
                    await apiClient.post(`/notices`, payload);
                }

                alert('Notice saved successfully!');
                this.$router.push('/notices');

            } catch (error) {
                console.error('Error submitting notice:', error);
            }
        },
        async fetchFormData(id) {
            try {
                const response = await apiClient.get(`/notices/${id}`)
                const data = response?.data?.data || {}

                this.title = data.title || ''
                this.type = data.type || ''
                this.description = data.description || ''
                this.featured_image = data.featured_image || ''
                this.location = data.location || ''
                this.link_page_url = data.link_page_url || ''
                this.tags = data.tags || ''
                this.status = data.status || ''
                this.urgency_importance = data.urgency_importance || ''
                this.comment_allowed = data.comment_allowed || ''
                this.poll = data.poll || ''

                console.log('Populated fields:', data)
            } catch (error) {
                console.error('Error fetching notice by ID:', error)
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
        handleBackspace() {
            if (this.searchInput === "" && this.selectedTags.length > 0) {
                this.selectedTags.pop();
            }
        },
        handleClickOutside(event) {
            const imageWrapper = this.$el.querySelector("#imageWrapper");
            const modal = this.$el.querySelector(".lightbox-modal");
            if (!imageWrapper?.contains(event.target) && !modal?.contains(event.target)) {
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
        handleDocumentUpload(event) {
            const files = Array.from(event.target.files);
            if (this.documents.length + files.length > 4) {
                alert("You can only upload up to 4 documents.");
                event.target.value = "";
                return;
            }
            files.forEach((file) => {
                this.documents.push({
                    name: file.name,
                    file
                });
            });
            event.target.value = "";
        },
        removeDocument(index) {
            this.documents.splice(index, 1);
        }
    },
    mounted() {
        const noticeId = this.$route.params.id;
        if (noticeId) {
            this.fetchFormData(noticeId)
        }
        this.$nextTick(() => {
            $('.icheck-comment').on('ifChecked', (event) => {
                this.comment_allowed = event.target.value
            })
            $('.icheck-urgency').on('ifChecked', (event) => {
                this.urgency_importance = event.target.value
            })
            $('.icheck-status').on('ifChecked', (event) => {
                this.status = event.target.value
            })
            $('.icheck-poll').on('ifChecked', (event) => {
                this.poll = event.target.value
            })
        })

        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    watch: {
        comment_allowed(newVal) {
            this.$nextTick(() => {
                $('.icheck-comment').iCheck('uncheck')
                $(`.icheck-comment[value="${newVal}"]`).iCheck('check')
            })
        },
        urgency_importance(newVal) {
            this.$nextTick(() => {
                $('.icheck-urgency').iCheck('uncheck')
                $(`.icheck-urgency[value="${newVal}"]`).iCheck('check')
            })
        },
        poll(newVal) {
            this.$nextTick(() => {
                $('.icheck-poll').iCheck('uncheck')
                $(`.icheck-poll[value="${newVal}"]`).iCheck('check')
            })
        },
        status(newVal) {
            this.$nextTick(() => {
                $('.icheck-status').iCheck('uncheck')
                $(`.icheck-status[value="${newVal}"]`).iCheck('check')
            })
        }
    }

}
</script>

<style scoped>
.form-control {
     height: 50px;
     font-size: 16.61px;
     font-weight: 400;
     padding: 12px;
     border-radius: 5px;
     color: #4C4036;
     border: 1px solid #ccc;
}
.tag-input {
     width: 100%;
     height: 50px;
     padding: 10px;
     border: 1px solid #695cfe;
     background-color: #242526;
     border-radius: 10px;
     font-size: 1.5rem;
     outline: none;
     color: white;
}
.tag {
     display: inline-block;
     background-color: #695cfe;
     width: auto;
     font-size: 0.5rem;
     text-transform: capitalize;
     padding-left: 10px;
     line-height: 1rem;
     margin: 5px;
     border-radius: 5px;
     color: white;
}
input::placeholder {
     color: #aaa;
}
</style>

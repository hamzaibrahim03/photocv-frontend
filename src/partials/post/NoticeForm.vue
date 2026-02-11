<template>
<div class="col-md-8">
    <div id="news">
        <div class="news-list">
            <div class="form-containers">
                <div class="row">
                    <div class="col-md-4">
                        <img src="@/assets/images/dashboard/c1.jpg" alt="Meeting" />
                    </div>
                    <div class="col-md-8 mb-3">
                        <label for="title"> Notice Title </label>
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="divider3"></div>
                <div class="row" style="
                    background-color: #99816b33;
                    margin-top: 15px;
                    border-radius: 7px;
                    padding: 10px;
                    margin-left: 2px;
                    ">
                    <h5>Notice Body</h5>
                    <p class="text-secondary">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad amet
                        rerum tempora unde eveniet asperiores doloribus architecto aliquam
                        ab optio! Nam voluptatum vero nulla reprehenderit incidunt dolorum
                        consectetur officiis minima.
                    </p>
                    <p class="text-secondary">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
                        culpa libero. Ut maiores illo voluptatem quia libero, quam
                        adipisci possimus nulla quidem ad quos itaque perferendis enim
                        fugiat! Rerum, laborum.
                    </p>
                </div>
                <div class="divider3"></div>
                <label for="type"> Notice Type </label>
                <select name="type" id="type" class="form-control">
                    <option value="Notice Type" disabled selected>
                        Select
                    </option>
                    <option value="active">Active</option>
                    <option value="enable">Enable</option>
                    <option value="diactive">Diactive</option>
                    <option value="disable">Disable</option>
                </select>
                <div class="divider3"></div>
                <label for="notice_status">Notice Status</label>
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-control">
                                    <input type="radio" id="act" name="Status" value="Active" />
                                    <span>Scheduled</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-control">
                                    <input type="radio" id="dra" name="Status" value="Draft" />
                                    <span>Postpond</span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-control">
                                    <input type="radio" id="sch" name="Status" value="Scheduled" />
                                    <span>TBC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-control">
                                    <input type="radio" id="del" name="Status" value="Deleted" />
                                    <span>Cancelled</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-control">
                                    <input type="radio" id="pen" name="Status" value="Pending" />
                                    <span>Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divider3"></div>
                <div class="container col-md-12 mb-3">
                    <label for="tags">Tags/Keywords</label>
                    <div class="tag-dropdown" id="tagDropdown" onclick="toggleDropdown()">
                        <div id="tagContainer" class="d-flex flex-wrap"></div>
                        <input type="text" id="searchInput" placeholder="Search..." onkeyup="filterDropdown()" class="sea" />
                    </div>
                    <div class="dropdown">
                        <ul class="dropdown-menu" id="dropdownMenu">
                            <li onclick="addTag('Urgent')">Urgent</li>
                            <li onclick="addTag('Meeting')">Meeting</li>
                            <li onclick="addTag('Reminder')">Reminder</li>
                            <li onclick="addTag('Policy Update')">Policy Update</li>
                            <li onclick="addTag('Holiday Notice')">Holiday Notice</li>
                            <li onclick="addTag('Exam Schedule')">Exam Schedule</li>
                        </ul>
                    </div>
                </div>
                <div class="divider3"></div>
                <label for="link"> Link to related Page </label>
                <input type="text" class="form-control" />
                <div class="divider3"></div>
                <label for="link"> Location </label>
                <input type="text" class="form-control" />

                <div class="divider3"></div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="image"> Image to be chosen </label>
                        <input type="file" id="imageUpload" class="form-control" @change="handleImageUpload" :disabled="images.length >= 4" multiple />
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
                </div>
                <div class="button-group">
                    <button class="btn me-2" id="view">Back</button>
                    <button class="btn" id="edit">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "NoticeForm",
    data() {
        return {
            selectedTags: [],
            searchInput: "",
            showDropdown: false,
            images: [],
            documents: [],
            showLightbox: false,
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
        addTag() {
            const value = this.searchInput.trim();
            if (value && !this.selectedTags.includes(value)) {
                this.selectedTags.push(value);
            }
            this.searchInput = "";
        },
        removeTag(index) {
            this.selectedTags.splice(index, 1);
        },
        handleBackspace() {
            if (this.searchInput === "" && this.selectedTags.length > 0) {
                this.selectedTags.pop();
            }
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
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>

<style scoped>
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

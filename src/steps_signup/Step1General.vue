<template>
<ClubSignup
    title="Let's Start!"
    subtitle="We just need a few basic details of the club."
  />
<div class="form">
    <!-- Club Name & Tagline -->
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="names"> Club Name </label>
            <input type="text" class="form-control" />
        </div>
        <div class="col-md-6 mb-3">
            <label for="tagline"> Club Tagline </label>
            <input type="text" class="form-control" />
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label for="domain_type">Domain Type</label>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-control">
                        <input type="radio" id="custom" name="domain_type" value="Custom Domain" />&nbsp;
                        <span>Custom Domain</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-control">
                        <input type="radio" id="sub" name="domain_type" value="Subdomain" />&nbsp;
                        <span>Sub Domain</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <label for="domain_name"> Domain Name </label>
            <input type="text" class="form-control" />
        </div>
    </div>

    <!-- Button -->
    <div class="button-group" style="justify-content:left">
        <button class="btn btn-sm" id="edit">Next</button>
    </div>
</div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 24px;
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

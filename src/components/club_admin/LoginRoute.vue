<template>
<div id="app">
    <Navigation v-if="isAuthPage" />
    <router-view />
</div>
<div class="container">
    <div class="login-container">
        <div>
            <img src="@/assets/images/photo.png" alt="Camera Club Logo" style="justify-content: center"/>
        </div>
        <h3>Login</h3>
        <form @submit.prevent="login">
            <div class="inputBox mb-3">
                <input type="text" v-model="username" class="form-control" required />
            </div>
            <div class="inputBox mb-3">
                <input type="password" v-model="password" class="form-control" required />
            </div>
            <div class="remember-forgot">
                <div class="remember-left">
                    <input type="checkbox" id="remember" />
                    <span for="remember">Remember me</span>
                </div>
                <a href="change_password.html" style="color: #cc445e">Forgot Password</a>
            </div>
            <button type="submit" class="btn btn-dark w-100">Login</button>
        </form>
        <p v-if="error" style="color: red">{{ error }}</p>
        <p v-if="token" style="color: green">
            Login successful! Token: {{ token }}
        </p>
        <div class="footer">&copy; 2025 photo.cv</div>
    </div>
    <div class="image-container"></div>
</div>
</template>

<script>
import {
    ref
} from "vue";
import {
    useUserStore
} from "@/stores/club_admin/UserStore";
import {
    useRouter
} from "vue-router";
import apiClient from "@/api/axios";

export default {
    name: "LoginRoute",
    setup() {
        const username = ref("");
        const password = ref("");
        const error = ref("");
        const router = useRouter();
        const userStore = useUserStore();

        const login = async () => {
            if (!username.value || !password.value) {
                error.value = "Please enter both username and password.";
                return;
            }

            error.value = "";

            try {
                const response = await apiClient.post("/login", {
                    email: username.value,
                    password: password.value,
                });

                const {
                    user,
                    token
                } = response.data.data;

userStore.role2=user.roles[0].name;

                userStore.login({
                    username: user.username || "",
                    first_name: user.first_name || "",
                    profile_image: user.profile_image || "",
                    tag_line: user.tag_line || "",
                    token: token,
                    role: user.roles[0].name, 
                });

                // Redirect based on role
                if (user.roles[0].name === "club_admin") {
                    router.push("/dashboard");
                } else if (user.roles[0].name === "member") {
                    router.push("/about");
                } else {
                    router.push("/"); 
                }
            } catch (err) {
                error.value = err.response?.data?.message || "Login failed.";
                console.error(err);
            }
        };

        return {
            username,
            password,
            error,
            login,
        };
    },
};
</script>

<style scoped>
body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    height: 100vh;
    margin: 0;
}

.container {
    display: flex;
    width: 2000px;
    height: 600px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-left: 160px;
}

.login-container {
    width: 265px;
    flex: 1;
    padding: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.login-container img {
    width: 430px;
    height: 100px;
    margin-bottom: 20px;
}

.form-control {
    border-radius: 5px;
}

.footer {
    margin-top: 0px;
}

h3 {
    font-weight: 400;
    font-size: 36px;
    line-height: 100%;
    margin-bottom: 50px;
}

.inputBox {
    position: relative;
}

.inputBox input {
    width: 600px;
    height: 50px;
    padding: 10px;
    border: 1px solid #99816b;
    border-radius: 4px;
    font-size: 1.5rem;
    outline: none;
    color: black;
}

.inputBox span {
    position: absolute;
    top: -18px;
    left: 15px;
    padding: 0 5px;
    font-size: 1.2rem;
    color: black;
    pointer-events: none;
    transition: none;
}

.inputBox input:focus~span,
.inputBox input:valid~span {
    transform: translateY(-20px);
    background: #fff;
    padding: 0 5px;
    font-size: 1rem;
}

.btn-dark {
    margin-top: 10px;
    border-radius: 5px;
    background-color: #3d302b;
    border: none;
    font-size: 1.5rem;
    width: 500px;
    height: 60px;
    color: white;
}

.btn-dark:hover {
    background-color: #2b1e19;
}

.remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
    margin-top: 10px;
}

.remember-left {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.remember-forgot a {
    text-decoration: none;
    color: #3d302b;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.image-container {
    flex: 1;
    width: 100px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: url("@/assets/images/loginc.png") no-repeat center center/cover;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        height: auto;
    }

    .login-container {
        padding: 30px;
    }

    .image-container {
        height: 250px;
        width: 100%;
        background-size: cover;
    }

    .btn-dark {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 20px;
    }

    .inputBox input {
        font-size: 1.2rem;
    }

    .btn-dark {
        font-size: 1rem;
        padding: 8px;
    }

    .remember-forgot {
        flex-direction: column;
        text-align: center;
    }

    .remember-forgot a {
        margin-top: 5px;
    }
}
</style>

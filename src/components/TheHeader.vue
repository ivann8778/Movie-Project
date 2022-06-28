<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <router-link class="navbar-brand flex-grow-1" to="/">
        <img :src="image" id="logo" />
      </router-link>
      <div class="flex-grow-1 d-flex container-fluid">
        <form class="form-inline mx-0 mx-lg-auto rounded">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search for a movie/serial ..."
            aria-label="Search"
          />
          <i style="margin: -60px" class="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a style="color: #f3f1fc8b" class="nav-item nav-link" href="#"
            ><i class="fa fa-plus" aria-hidden="true"></i>
          </a>
        </div>
        <div class="dropdown">
          <a
            class="text-reset me-3 dropdown-toggle hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i style="color: #f3f1fc8b" class="fas fa-bell"></i>
            <span class="badge rounded-pill badge-notification bg-success">
              1</span
            >
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a class="dropdown-item" href="#">Some news</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Another news</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <a
            style="color: white"
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="avatar"
              class="rounded-circle"
              height="30"
              alt=" Portrait of a User"
              loading="lazy"
            />
            Ivan Popov
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item" href="#">My profile</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Settings</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import image from "../assets/logo-small.png";
import avatar from "../assets/avatar.jpg";

export default {
  name: "TheHeader",
  data() {
    return {
      image,
      avatar,
    };
  },
};
</script>

<style scoped>
nav {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 90px;
  background: #182131 0% 0% no-repeat padding-box;
  opacity: 0.91;
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  z-index: 99999;
}
input::placeholder {
  color: #ffffff;
}
input[type="search"] {
  top: 19px;
  left: 761px;
  width: 398px;
  height: 52px;
  background: #ffffff51 0% 0% no-repeat padding-box;
  border-radius: 30px;
  opacity: 0.3;
}

#logo {
  margin-left: 50px;
}
#navbarNavAltMarkup {
  top: 19px;
  left: 1384px;
  width: 396px;
  height: 52px;
  margin-right: 50px;
}
.dropdown {
  margin: 20px;
}
.dropdown-menu {
  background: #ffffff51 0% 0% no-repeat padding-box;
}
</style>

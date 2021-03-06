"""LAPBlogsBackEnd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# from django.contrib import admin
# from django.urls import path
from django.conf.urls import url
from .blog_api import users
from .blog_api import blogs
from .blog_api import ip

urlpatterns = [
    url(r'^requestBlogs$',blogs.requestBlogs),
    url(r'temporarySave$',blogs.temporarySave),
    url(r'^searchUser$', users.searchUser),
    url(r'^registe$', users.registe),
    url(r'^login$', users.login),
    url(r'^insertBlog$',blogs.insertBlog),
    url(r'^userBlogs$',blogs.userBlogs),
    url(r'^userBlog$',blogs.userBlog),
    url(r'^editBlog$',blogs.editBlog),
    url(r'^ipAccess$',ip.ipAccess),
    url(r'^handleStar$',ip.handleStar),
]

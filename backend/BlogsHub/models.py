from django.db import models
from django.conf import settings
from django.utils.text import slugify


# Create your models here.
class Blog(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)


class Comments(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{str(self.author)}, {self.blog.title[:30]}"

    class Meta:
        ordering = ["created_at"]


class Likes(models.Model):
    like_choices = [(1, "Like"), (0, "Neutral"), (-1, "Dislike")]
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="likes")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_status = models.SmallIntegerField(choices=like_choices, default=0)

    def __str__(self) -> str:
        return f"{str(self.author)}, {self.blog.title[:30]}"


class BlogGallery(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(upload_to="blog_gallery")

    def __str__(self) -> str:
        return f"{self.blog.title[:30]}"

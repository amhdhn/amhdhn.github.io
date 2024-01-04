سلام
دوتا فایل زیر رو به هر صفحه ای که قرار اهنگ داشته باشه اضافه کنید
player.js player.css
بنابراین نیازی به اضافه کردن این فایل به صفحه درباره ما و ... نیست
همچنین توی هر صفحه ای که قرار هست اهنگ داشته باشه المنت زیر با فرزنداش رو اضافه کنید
playerSection


توی طراحی صفحه تون هرجا قرار یک المنت بعد از کلیک شدن اهنگ رو بخش کنه
باید ویژگی های زیر رو داشته باشه

onclick="prepareMusic(this)"
که مشخص میکنه زمانی که کلیک شد پلیر نمایش داده بشه

data-index="0"
نشون دهنده شمارشگر و تعداد موزیک ها توی صفحه هستش
همیشه از صفر شروع کنید و به هر ایتم یک شمارشگر منحصر به فرد بدید

data-src="src/music1.mp3"
میشه لینک فایل اهنگ

data-artist="محسن یگانه" 
نام خواننده


data-song="سرگرمی تو" 
نام اهنگ

data-cover="src/musicImg1.jpg"
کاور اهنگ

اینم درنهایت عملکرد لمنتی که این موزیک رو اجرا میکنه
button onclick="prepareMusic(this)" data-index="0" data-src="src/music1.mp3" data-artist="محسن یگانه" data-song="سرگرمی تو" data-cover="src/musicImg1.jpg" class="playListPlayBtn faFont textSize3 flex flexCenter gap15">
    <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg>
    پخش موسیقی
</button>
Bir "Ehliyet Sınavına Hazırlık" mobil uygulaması geliştireceğiz. Bu uygulama tamamen Expo (React Native) ile geliştirilecek ve backend (sunucu/veritabanı) KULLANILMAYACAKTIR. Tüm veriler yerel (offline) olarak yönetilecek. Lütfen aşağıdaki gereksinimleri, teknik yapıyı ve tasarım dilini dikkate alarak projeyi iskeletinden başlayarak oluştur.

# TEKNİK YAPI VE KÜTÜPHANELER
- Çerçeve: Expo (Managed Workflow), React Native
- Dil: JavaScript / TypeScript (TypeScript tercih edilir)
- Navigasyon: React Navigation (Bottom Tabs ve Native Stack)
- State Yönetimi: Zustand (Uygulama içi hızlı state yönetimi) + AsyncStorage (İstatistikleri ve yanlış soruları yerel hafızada tutmak için 'zustand/middleware' persist kullanılacak)
- Veri Kaynağı: Tüm sorular ve levhalar uygulamanın içinde 'data/questions.json' ve 'data/signs.json' isimli statik dosyalardan çekilecek.

# TASARIM VE ARAYÜZ (UI/UX)
- Temiz, aydınlık ve standart bir arayüz (Clean UI). Beyaz/açık gri arka planlar ve güven veren bir mavi (#007AFF gibi) ana renk kullanılmalı.
- Metinler okunaklı (koyu gri/siyah), butonlar otobüste giderken bile kolayca basılabilmesi için geniş dokunmatik alanlara (min 48x48) sahip olmalı.
- Tasarımda macera aranmayacak; standart, 18-60 yaş arası herkesin kolayca anlayabileceği klasik ve kullanıcı dostu bir düzen kullanılacak.

# UYGULAMA MİMARİSİ VE EKRANLAR

1. Ana Navigasyon (Bottom Tab):
   - Anasayfa (Dashboard)
   - Sınavlar
   - Levhalar
   - Profil/İstatistikler

2. Ekran Detayları:
   - Anasayfa (Dashboard): Kullanıcının genel başarı yüzdesini gösteren basit bir bar veya pasta grafik. Hızlıca "Rastgele 10 Soru Çöz" butonu ve "Yanlış Yaptığım Sorular" butonu.
   - Sınavlar Ekranı: 3 farklı mod seçeneği sunulacak:
     a) Gerçek Sınav Modu: 50 soru, 45 dakika geri sayım sayacı. Sınav bitmeden doğru/yanlış gösterilmeyecek. Sınav bitiminde sonuç ekranı.
     b) Hızlı Antrenman: 10 veya 20 soruluk, her sorudan sonra doğru/yanlışı anında gösteren mod.
     c) Kategori Antrenmanı: Sadece "Motor", "Trafik", "İlkyardım" veya "Trafik Adabı" seçilerek çözülen mod.
   - Sınav Anı (Soru) Ekranı: Minimalist. Üstte kalan süre, ortada soru metni ve varsa görseli, altta geniş ve net A, B, C, D butonları. Alt kısımda 'Önceki' ve 'Sonraki' yönlendirme butonları.
   - Levhalar Ekranı: Trafik levhaları ve araç gösterge paneli ışıkları için Scrollable (kaydırılabilir) basit bir liste/grid yapısı. Üstte bir arama çubuğu (Search bar) eklenecek.
   - Yanlışlarım Ekranı: Sınavlarda yanlış yapılan sorular AsyncStorage üzerinden çekilip burada listelenecek. Kullanıcı sadece bu soruları tekrar çözebilecek. Soruyu doğru yaparsa listeden düşecek.

# YAPILACAK İLK GÖREVLER
1. Proje klasör yapısını (src/components, src/screens, src/navigation, src/store, src/data) oluştur.
2. React Navigation kullanarak Bottom Tab ve Stack Navigator kurulumlarını yap.
3. 'data' klasörü içine örnek formatta (Id, Kategori, Soru Metni, A, B, C, D şıkları, Doğru Cevap, Görsel URL) 5 adet örnek soru içeren bir 'questions.json' dosyası oluştur.
4. Anasayfa ve minimal Soru Çözüm ekranının UI kodlarını yazarak uygulamayı çalışır ve test edilebilir bir MVP haline getir.

Lütfen kodu parça parça, modüler ve temiz bir şekilde, her bileşenin ne işe yaradığını yorum satırlarıyla açıklayarak ver. Önce klasör yapısını ve navigasyonu kurarak başla.
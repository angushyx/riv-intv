<h1 align="center">Riv面試題</h1>


#### 🔗Website URL: <a href="https://riv-intv.vercel.app/"><strong>riv-intv</strong></a>

<hr>

### 各section實作的方法和內容

<h3 align="center">Header</h3>

1. 使用 useState hook 定義 isScrolled 和 lastScroll 兩個狀態，初始值分別為 false 和 0。

2. 使用 useEffect hook，設定一個名為 handleScroll 的滾動事件處理函式，裡面先獲取目前滾動的 Y 軸位置，並根據這個位置和上一次的位置以及 300px 的閥值來決定是否要顯示 header。

3. 使用 addEventListener 將 handleScroll 函式綁定到 window 的滾動事件上，並使用 removeEventListener 在 useEffect hook 結束時將它移除。

4. 定義一個名為 headerClasses 的變數，使用條件式來決定是否要加上 hide 這個 CSS class，該 class 會將 header 隱藏。

5. 最後，回傳一個 header 標籤，其中 className 屬性會使用剛剛定義的 headerClasses 變數，並將 children 渲染在 header 內部。

<h3 align="center">ShuffleCards</h3>

1. 首先，建立了兩個狀態：isCardOneClicked 和 isCardTwoClicked，它們的初始值都是 false。

2. 定義了一個 handleCardClick 函式，當卡片被點擊時，它會根據目前狀態的值來更新狀態。具體來說，如果 isCardOneClicked 是 false，那麼它就會被更新為 true，isCardTwoClicked 也是如此。這樣做的目的是當其中一個卡片被點擊時，另一個卡片的狀態也會同步更新。

3. 定義了一個 handleCardClick 函式，當卡片被點擊時，它會根據目前狀態的值來更新狀態。具體來說，如果 isCardOneClicked 是 false，那麼它就會被更新為 true，isCardTwoClicked 也是如此。這樣做的目的是當其中一個卡片被點擊時，另一個卡片的狀態也會同步更新。

4. 定義了四個class，分別是 shuffleCardsWrapper、shuffleCard、shuffleCardOne 和 shuffleCardTwo，在卡片被點擊後，對應卡片的 class 會進行變更，從而改變卡片的樣式。

- .shuffleCardsWrapper：父容器，定義了一些基本的樣式，如寬度、高度、位置等。
- .shuffleCard：卡片的基本樣式，定義了寬度、位置、過渡效果、變換原點、光標等。
- .shuffleCardOne 和 .shuffleCardTwo：分別對應卡片一和卡片二的樣式，定義了初始位置、堆疊順序、變換等。
- .cardOneClicked 和 .cardTwoClicked：分別對應卡片一和卡片二被點擊後的樣式，改變了堆疊順序、位置、大小等。
- .cardOneEnlarged 和 .cardTwoEnlarged：分別對應卡片一和卡片二被放大後的樣式，只改變了大小。 


<h3 align="center">Video</h3>

1. 使用 useState、useEffect 和 useRef 來設定影片是否顯示、是否正在播放、目前的播放時間和 video element 的 reference。

2. handleCanPlay callback：影片可以播放時確認是否需要播放影片。

3. handleIntersection callback：在影片進入畫面或離開畫面時設定影片的顯示狀態、播放狀態和播放時間。

4. useEffect，使用 IntersectionObserver 監聽 video element 的進入畫面事件，並設定至少有 30% 的內容在畫面內才算進入畫面。

5. handleVideoClick callback：在點擊 video element 時控制影片的播放/暫停狀態，並設定影片的播放時間。

6. handleTimeUpdate callback：在影片播放時間更新時確認是否需要重新設定播放時間。

7. handleVisibilityChange callback：在影片不在畫面內時停止播放並設定播放時間為 0。

8. 使用 useEffect 監聽 visibilitychange 事件，並在影片不在畫面內時觸發 handleVisibilityChange。

<h3 align="center">HorizontalCards</h3>

1. 組件開始定義了一個陣列 cardImages，用來儲存卡片的圖片。

2. 接著使用了 useState Hooks 定義了三個狀態： isDragging，startX 和 scrollLeft。它們分別表示滾動卡片列表時的拖動狀態、開始拖動的 X 軸位置和卡片列表目前的水平滾動量，另外還定義了一個 useRef Hooks，用來取得卡片列表的 DOM 元素的引用。

3. 在滑鼠事件處理函式中，handleMouseDown 函式是在滑鼠點擊時執行的函式，它將 isDragging 設為 true，同時儲存滑鼠按下時的位置和卡片列表目前的水平滾動量。

4. handleMouseMove 函式則是在滑鼠移動時執行的函式，當 isDragging 為 true 時，它會根據滑鼠移動的距離計算出新的滾動量，並使用 current.scrollLeft 屬性來更新卡片列表的水平滾動量，從而達到拖動卡片列表的效果。handleMouseUp 函式會在滑鼠釋放時執行，將 isDragging 設為 false，表示拖動結束。

4. 最後，使用 map 函式從 cardImages 陣列中遍歷所有卡片圖片，並使用 Image 元件渲染卡片的內容。整個卡片列表的 DOM 元素使用 ul 和 li 元素實現。在 ul 元素上綁定了幾個滑鼠事件處理函式，這些函式在卡片列表上進行滑鼠拖動時執行，從而實現了卡片列表的拖動效果。

### 使用技術

- [Next.js ( 13.2.4 )](https://nextjs.org/)
- [CSS](https://developer.mozilla.org/zh-TW/docs/Web/CSS)
- [vercel](https://vercel.com/dashboard) Deploy

### 版本控制

- Git / Github

### 資料夾結構

| Folder      | Description  |
| ----------- | ------------ |
| components/ | 各個 section |
| page /      | index-->首頁 |






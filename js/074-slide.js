$(function () {
    var $li = $('.slide_pics li');
    var len = $li.length; // 获取一共几张图
    var nextli = 0; // 切换的下一张图li索引值 nowli
    var preli = 0; // 当前准备离开图li索引值  preli
    var $prev = $('.prev');
    var $next = $('.next');
    var timer = null;

    $li.not(':first').css({left: 760}); // 除了第一个以外其他的都放在右边
    $li.each(function (index) {
        var $sli = $('<li>'); // 准备添加点点li
        if (index === 0) {
            $sli.addClass('active'); // 默认选中第一个点
        }
        $('.points').append($sli);
    });
    var $points = $('.points li');
    // 向左翻
    $prev.click(function () {
        nextli--;
        move();
        $points.eq(nextli).addClass('active').siblings().removeClass('active');
    });
    // 向右翻
    $next.click(function () {
        nextli++;
        move();
        $points.eq(nextli).addClass('active').siblings().removeClass('active');
    });
    // 自动移动
    timer = setInterval(autoplay, 3000);
    function autoplay() {
        nextli++;
        move();
        $points.eq(nextli).addClass('active').siblings().removeClass('active');
    }
    // 鼠标悬停清除定时器，两种写法

    // $('.slide').mouseenter(function () {
    //     clearInterval(timer);
    // });
    // $('.slide').mouseleave(function () {
    //     timer = setInterval(autoplay,3000);
    // });
    $('.slide').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoplay, 3000);
    });
    // 图片点点对应点击事件
    $points.click(function () {
        nextli = $(this).index();
        move();
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 移动函数
    function move() {
        // 点击相同的点点情况
        if (nextli === preli) {
            return;
        }
        // 向左翻到头的情况
        if (nextli < 0) {
            nextli = len - 1;
            preli = 0;
            $li.eq(nextli).css({left: -760}); // 下一个点放到左边
            $li.eq(preli).stop().animate({left: 760}); // 上一个点向右离开，从左边往右边移动760px
            $li.eq(nextli).stop().animate({left: 0}); // 下一个点进入，到0
            preli = nextli;
            return;
        }
        // 向右翻到头的情况
        if (nextli > len - 1) {
            nextli = 0;
            preli = len - 1;
            $li.eq(nextli).css({left: 760}); // 下一个点放到右边
            $li.eq(preli).stop().animate({left: -760}); // 上一个点向左离开，从右边往左边移动760px
            $li.eq(nextli).stop().animate({left: 0}); // 下一个点进入，到0
            preli = nextli;
            return;
        }

        // 如果下一个点大于上一个点，从小到大
        if (nextli > preli) {
            $li.eq(nextli).css({left: 760}); // 下一个点放到右边
            $li.eq(preli).stop().animate({left: -760}); // 上一个点向左离开，从右边往左边移动760px
            // $li.eq(nextli).stop().animate({left:0}); // 下一个点进入，到0
            // alert('nextli:'+nextli);//1----2----3
            // alert('preli:'+preli);//0------1----2
            // preli = nextli; // nextli不停的变值,如果不加这个preli始终是0

        } else {
            // 上一个点大于下一个点，从大到小
            $li.eq(nextli).css({left: -760}); // 下一个点放到左边
            $li.eq(preli).stop().animate({left: 760}); // 上一个点向右离开，从左边往右边移动760px
            // $li.eq(nextli).stop().animate({left:0}); // 下一个点进入，到0
            // alert('**nextli:'+nextli);//2----1----0
            // alert('**preli:'+preli);//3------2----1，假如第一次点的是最后一张图的点点，索引值3
            // preli = nextli; // nextli不停的变值，如果不加这个preli始终是第一次点击的点点索引值
        }
        $li.eq(nextli).stop().animate({left: 0}); // 下一个点进入，到0
        preli = nextli;
    }
});
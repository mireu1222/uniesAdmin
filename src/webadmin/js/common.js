$(function () {
    $(".tablesorter").tablesorter({
        widgets: ['staticRow'],
        headers : {
            'th:not(.sorting)' : {
                sorter : false
            }
        }
    });

    //checkbox All checked 
    allChecker();

    // 퇴사사유 입력 활성화
    selectInputChange('#selectOption');
});

// checkbox all check
function allChecker() {
    var obj = '[data-toggle="allChk"]',
        $obj = $(obj);

    if ($obj.length <= 0) return;
    $obj.each(function(){
        var $input = $(this).find('.chk-all'),
            name = $input.attr('name');

        $input.on('change', function(){
            var $name = $(this).attr('name'),
                $wrapper = $(this).parents(obj),
                $childs = $wrapper.find('input[name='+ $name +']');
            
            if ($(this).prop("checked")) {
                $childs.prop("checked", true);
            } else {
                $childs.prop("checked", false);
            }
        });
        
        $('input[name=' + name + ']').each(function () {
            var $this = $(this);
    
            $this.on('change', function () {
                var total = $('input[name=' + name + ']').length;
                var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
                if (chked == total) {
                    $input.prop("checked", true);
                } else {
                    $input.prop("checked", false);
                }
            });
        });
    });
}

// 퇴사사유 selectbox option
function selectInputChange(obj) {
    var target = $(obj);

    if (target.length <= 0) return;

    target.on('change', function(){
        var $select = $(this);
        var $value = $select.children('option:selected').val();

        if( $value === 'inputDisplay' ) {
            $select.siblings('.form-control').removeAttr('disabled').focus();
        } else {
            $select.siblings('.form-control').attr('disabled', true);
        }
    });
}
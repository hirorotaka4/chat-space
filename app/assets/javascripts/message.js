$(function () {
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message-box">
        <div class="message-box__contributor-info">
          <p class="message-box__contributor-info__user-name">
            ${message.user_name}
          </p>
          <p class="message-box__contributor-info__daytime">
            ${message.created_at}
          </p>
        </div>
        <div class="message-box__message">
          <p class="message-box__message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`;
      return html;
    } else {
      var html = `<div class="message-box">
        <div class="message-box__contributor-info">
          <p class="message-box__contributor-info__user-name">
            ${message.user_name}
          </p>
          <p class="message-box__contributor-info__daytime">
            ${message.created_at}
          </p>
        </div>
        <div class="message-box__message">
          <p class="message-box__message__content">
            ${message.content}
          </p>
        </div>
      </div>`;
      return html;
    }
  }
  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight });
        $("form")[0].reset();
        $(".new-message__submit-btn").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
        $(".new-message__submit-btn").prop("disabled", false);
      });
  });
});

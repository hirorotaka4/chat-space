$(function () {
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message-box" data-message-id=${message.id}>
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
      var html = `<div class="message-box" data-message-id=${message.id}>
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
  var reloadMessages = function () {
    var last_message_id = $(".message-box:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id },
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          var insertHTML = "";
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message);
          });
          $(".messages").append(insertHTML);
          $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight });
        }
      })
      .fail(function () {
        alert("error");
      });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

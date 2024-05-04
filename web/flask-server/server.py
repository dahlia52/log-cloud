from flask import Flask, request, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session

from config import ApplicationConfig
from models import db

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


from server_khj import record_video, select_option, add_log, save_log, \
    register_user, remove_registered_user, login_user, logout_user

@app.route('/add_log', methods=['POST'])
def add_log_route():
    return add_log(request, session)

@app.route('/record', methods=['POST'])
def record_video_route():
    return record_video(request, session)

@app.route('/upload', methods=['POST'])
def select_option_route():
    return select_option(request, session)

@app.route('/save', methods=['POST'])
def save_log_route():
    return save_log(request, session)


from server_jjh import analysisReport, searchResult, social, socialDetail, comments, get_log_overview_of_month, log_hearts, logDetail, sendComments, hearts, sendHearts, delete_post

@app.route("/analysisReport", methods=['POST', 'GET'])
def analysisReport_route():
   return analysisReport(request, session)


@app.route('/searchresult', methods=['POST','GET'])
def searchResult_route():
   return searchResult(request, session)


@app.route("/social")
def social_route():
    return social(request, session)


@app.route("/socialdetail", methods=['POST','GET'])
def socialDetail_route():
	return socialDetail(request, session)


@app.route("/comments", methods=['POST','GET'])
def comments_route():
	return comments(request, session)


@app.route("/sendComments", methods=['POST','GET'])
def sendcomments_route():
	return sendComments(request, session)


@app.route("/hearts", methods=['POST','GET'])
def hearts_route():
   return hearts(request, session)


@app.route("/sendHearts", methods=['POST','GET'])
def send_hearts_route():
	return sendHearts(request, session)


@app.route("/month-overview", methods=['POST'])
def get_log_overview_of_month_route():
    return get_log_overview_of_month(request)


@app.route("/log_hearts", methods=['POST','GET'])
def log_hearts_route():
   return log_hearts(request, session)


@app.route("/logdetail", methods=['POST','GET'])
def log_detail_route():
    return logDetail(request, session)


@app.route("/deletePost", methods=['POST','GET'])
def delete_post_route():
    return delete_post(request, session)




from server_jyb import check_authentication, check_username_availability, change_user_password, \
    get_current_user, get_user_profile_image, set_profile_image, \
    send_friend_request, search_user, get_friend_list, unsend_friend_request, \
    reject_friend_request, accept_friend_request, remove_friend


@app.route('/authentication', methods=['GET'])
def check_authentication_route():
    return check_authentication(request, session)


@app.route('/username_availability', methods=['GET'])
def check_username_availability_route():
    return check_username_availability(request)


@app.route('/registration', methods=['POST'])
def register_user_route():
    return register_user(request, bcrypt)


@app.route('/change_password', methods=['POST'])
def change_user_password_route():
    return change_user_password(request, session, bcrypt)


@app.route('/delete_account', methods=['POST'])
def remove_registered_user_route():
    return remove_registered_user(request, session)


@app.route('/login', methods=['POST'])
def login_user_route():
    return login_user(request, bcrypt)


@app.route('/logout', methods=['GET'])
def logout_user_route():
    return logout_user(request, session)
    

@app.route("/@me")
def get_current_user_route():
    return get_current_user(request, session)
    

@app.route("/get_profile_image", methods=['POST'])
def get_user_profile_image_route():
    return get_user_profile_image(request)


@app.route("/set_profile_image", methods=['POST'])
def set_profile_image_route():
    return set_profile_image(request, session)


@app.route('/get_friend_list', methods=['POST'])
def friend_information_route():
    return get_friend_list(request, session)


@app.route('/search_user', methods=['POST'])
def search_user_route():
    return search_user(request, session)


@app.route('/send_friend_request', methods=['POST'])
def send_friend_request_route():
    return send_friend_request(request, session)


@app.route('/unsend_friend_request', methods=['POST'])
def unsend_friend_request_route():
    return unsend_friend_request(request, session)

@app.route('/reject_friend_request', methods=['POST'])
def reject_friend_request_route():
    return reject_friend_request(request, session)


@app.route('/accept_friend_request', methods=['POST'])
def accept_friend_request_route():
    return accept_friend_request(request, session)


@app.route('/remove_friend', methods=['POST'])
def remove_friend_route():
    return remove_friend(request, session)



if __name__ == "__main__":
    app.run(debug=True)

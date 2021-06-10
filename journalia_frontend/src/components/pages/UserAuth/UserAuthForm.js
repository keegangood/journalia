import React from 'react';

const UserAuthForm = ({ formAction, ...props }) => {
  return (
    <form className="p-2 pb-4" id="user-auth-form">
      <div class="mb-4 form-group">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" />
      </div>
      <div class="mb-4 form-group">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-4 form-group">
        <button type="submit" class="btn btn-primary w-100" id="submit">Submit</button>
      </div>
      {formAction === 'login' && (
        <div class="mt-3">
          <a href="#" className="mt-3 text-muted primary-link text-decoration-none small">Forgot your password?</a>
        </div>

      )}

    </form>
  )
}

export default UserAuthForm

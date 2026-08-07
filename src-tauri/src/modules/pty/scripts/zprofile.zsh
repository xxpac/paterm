# paterm-shell-integration (zprofile)
#
# See zshenv.zsh for the rationale on the trailing `:`.
{
  _paterm_user_zdotdir="${PATERM_USER_ZDOTDIR:-$HOME}"
  [ -f "$_paterm_user_zdotdir/.zprofile" ] && source "$_paterm_user_zdotdir/.zprofile"
  unset _paterm_user_zdotdir
}
:

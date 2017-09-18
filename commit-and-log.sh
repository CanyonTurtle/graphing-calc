echo $1
git tag $1 -F docs/$1.txt
git tag -n20 > docs/version-history.txt
git add *
git commit -m "$1"
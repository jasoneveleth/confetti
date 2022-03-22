# Confetti website

We use rotation matrices like in ![this image](images/rot.png).

The idea is we have confetti starting at (rand(-10, 10), 10, 0)
with coordinates (x,y,z). Which look like:

```
         ^ y
         |
         |
         |
         |
       z *-----------> x
```

And z coming toward you out of the page.

Our camera has no rotation, but is at z = -10.

# TODO

* use zbuffer for depth (based on closest vertex)
* proper handling of recycling


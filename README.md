# Confetti website

Coordinates (x,y,z). Look like:

```
         ^ y
         |
         |
         |
         |
       z *-----------> x
```

And z coming toward you out of the page.

Our camera has no transformation, except z translation of -10.

# TODO

* use zbuffer for depth (based on closest vertex), and vary the z
  value
* proper handling of replacing old confetti


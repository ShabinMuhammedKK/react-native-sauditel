if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/shabin-muhd/.gradle/caches/8.10.2/transforms/5dce392d50462827b5a0c28e8b58e5ff/transformed/jetified-hermes-android-0.77.0-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/shabin-muhd/.gradle/caches/8.10.2/transforms/5dce392d50462827b5a0c28e8b58e5ff/transformed/jetified-hermes-android-0.77.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

